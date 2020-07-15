const cheerio = require('cheerio');
const axios = require('axios');
const configLogin = require('./AxiosConfigurations');
const psKnownUri = require('./URIList');
const cookieHandler = require('./CookieHandler');
const cacheQueries = require('./CacheQueries');

const recvServer = [
    'studentName',
    'studentGpa',
    'studentId',
    'studentCourse',
    'studentSchedule'
];

const isCacheEmpty = () => {
    const allElem = recvServer.length;
    let nullElem = 0;
    for (let elems of recvServer) {
        if (localStorage.getItem(elems) === null){
            nullElem++;
        }
    }
    if (nullElem === allElem)
        return 1;
    return 0;
};

const initData = (elem) => {
    localStorage.setItem(elem, JSON.stringify({
        first: '',
        second: ''
    }));
}

const normalizeDataPos = () => {
    for (let elems of recvServer)
        if (!JSON.parse(localStorage.getItem(elems)).first) {
            const obj = JSON.parse(localStorage.getItem(elems));
            obj.first = obj.second;
            localStorage.setItem(elems, JSON.stringify(obj));
        }
}
const syncData = async () => {

    // Check if it's the first sync
    for (let elems of recvServer){
        if (localStorage.getItem(elems) === null)
            initData(elems);
    }
    // Get Existing Data
    const objName = JSON.parse(localStorage.getItem('studentName'));
    const objGpa = JSON.parse(localStorage.getItem('studentGpa'));
    const objId = JSON.parse(localStorage.getItem('studentId'));
    const objCourse = JSON.parse(localStorage.getItem('studentCourse'));
    const objSched = JSON.parse(localStorage.getItem('studentSchedule'));

    // Try to Fetch Data
    const update = await updateData();
    // Push fetched data into localStorage
    if (update !== 1) {
        objName.second = objName.first;
        objGpa.second = objGpa.first;
        objId.second = objId.first;
        objCourse.second = objCourse.first;
        objSched.second = objSched.first;
        objName.first = update.studentName;
        objGpa.first = update.studentGpa;
        objId.first = update.studentId;
        // for (let i = 0; i < update.studentCourse.length; i++){
        //     let error = false;
        //     for (let j = 0; j < update.studentCourse[i].courseList.length; j++) {
        //         if (update.studentCourse[i].courseList[j].courseLength !== update.studentCourse[i].courseList[j].courseGrade.length)
        //             error = true
        //     }
        //     if (!error)
        //         objCourse.first[i] = update.studentCourse[i];
        // }
        objCourse.first = update.studentCourse;
        objSched.first = update.studentSchedule;
        localStorage.setItem('studentName', JSON.stringify(objName));
        localStorage.setItem('studentGpa', JSON.stringify(objGpa));
        localStorage.setItem('studentId', JSON.stringify(objId));
        localStorage.setItem('studentCourse', JSON.stringify(objCourse));
        localStorage.setItem('studentSchedule', JSON.stringify(objSched));
        normalizeDataPos();
        return 0;
    }
    // Send back message if data fetch wasn't successful
    return 1;
}

const updateData = async () => {
    const sendServer = {
        'site': psKnownUri.rootDomain + psKnownUri.studentClassSchedule,
        'pathURL': '',
        'userId': cookieHandler.getCredentials().userId,
        'pwd': cookieHandler.getCredentials().pwd,
        'mode': 'default'
    };

    try {
        let tempReturnStudent = {};
        let tempReturnStudentPriv = {};
        let tempReturnGradeDetail = {};
        let tempReturnSchedule = [];
        const studentFetchFn = async () => {
            const sendServerTemp = {...sendServer};
            sendServerTemp['site'] = psKnownUri.rootDomain + psKnownUri.studentGradeAndProfile;
            await axios.post(cookieHandler.getProxyUri(), sendServerTemp, configLogin)
                .then(res => {
                    const $ = cheerio.load(res.data, {normalizeWhitespace: true});
                    const userName = $(cacheQueries.studentInformation.studentName).text(); // Student Name
                    // const greetings = // May want to randomize the greetings
                    const userGpa = $(cacheQueries.studentInformation.studentGpa).text(); // Student GPA
                    tempReturnStudent = {
                        studentName: userName,
                        studentGpa: userGpa
                    };
                })
                .catch(err => console.log(new Error(err)));
            if (!tempReturnStudent.studentGpa) {
                await new Promise(callback => setTimeout(() => callback(), 5000));
            }
        }
        const studentPrivFn = async () => {
            const sendServerTemp = {...sendServer};
            sendServerTemp['site'] = psKnownUri.rootDomain + psKnownUri.studentPrivateInformation;
            await axios.post(cookieHandler.getProxyUri(), sendServerTemp, configLogin)
                .then(res => {
                    const $ = cheerio.load(res.data, {normalizeWhitespace: true});
                    const userId = $(cacheQueries.studentInformation.studentId).text() // Student ID
                    tempReturnStudentPriv = {
                        studentId: userId
                    };
                })
                .catch(err => console.log(new Error(err)));
        }
        const gradeDetailFn = async () => {
            const sendServerTemp = {...sendServer};
            sendServerTemp['site'] = '';
            sendServerTemp['pathURL'] = psKnownUri.studentGradeTermDetail;
            sendServerTemp['requestModel'] = cacheQueries.requestModel;
            await axios.post(cookieHandler.getProxyUri('fetchXhr'), sendServerTemp, configLogin)
                .then(res => {
                    tempReturnGradeDetail = {
                        studentCourse: res.data
                    };
                })
                .catch(err => console.log(new Error(err)));
        }
        const classScheduleFn = [];
        const weeks = 2;
        for (let weekIter = 0; weekIter < weeks; weekIter++) {
            tempReturnSchedule.push({});
        }
        for (let weekIter = 0; weekIter < weeks; weekIter++) {
             classScheduleFn.push( async () => {
                const sendServerTemp = {...sendServer};
                const requestModel = {...cacheQueries.requestModelSchedule};
                const today = new Date();
                sendServerTemp['site'] = '';
                sendServerTemp['pathURL'] = psKnownUri.studentWeeklySchedule;
                sendServerTemp['mode'] = 'schedule'
                today.setDate(today.getDate() + (7 * weekIter));
                requestModel['DERIVED_CLASS_S_START_DT'] = `${('0' + (today.getMonth() + 1)).slice(-2)}/${('0' + today.getDate()).slice(-2)}/${today.getFullYear()}`;
                sendServerTemp['requestModel'] = requestModel;
                await axios.post(cookieHandler.getProxyUri('fetchXhr'), sendServerTemp, configLogin)
                    .then(res => {
                        tempReturnSchedule[weekIter] = {
                            studentSchedule: res.data
                        };
                    })
                    .catch(err => console.log(new Error(err)));
            });
        }

        await Promise.all([
                studentFetchFn(),
                studentPrivFn(),
                gradeDetailFn(),
                classScheduleFn.map(schedule => schedule())
            ]);
        if (tempReturnStudentPriv.studentId && tempReturnStudent.studentName && tempReturnStudent.studentGpa && tempReturnGradeDetail.studentCourse) {
            let mergedTempReturnSchedule = [];
            for (let schedule of tempReturnSchedule) {
                if (!schedule.studentSchedule)
                    return 1;
                mergedTempReturnSchedule = [
                    ...mergedTempReturnSchedule,
                    ...schedule.studentSchedule
                ];
            }
            return {
                studentId: tempReturnStudentPriv.studentId,
                studentName: tempReturnStudent.studentName,
                studentGpa: tempReturnStudent.studentGpa,
                studentCourse: tempReturnGradeDetail.studentCourse,
                studentSchedule: mergedTempReturnSchedule
            }
        }
        else {
            return 1;
        }
    }catch (e) {
        return (1);
    }
}

module.exports.syncData = syncData;
module.exports.isCacheEmpty = isCacheEmpty;