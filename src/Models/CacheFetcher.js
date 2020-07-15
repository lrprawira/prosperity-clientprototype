const cachedStudentGpa = () => {
    try {
        return parseFloat(JSON.parse(localStorage.getItem('studentGpa')).first);
    }catch (e) {
        return ''
    }
};

const cachedStudentName = () => {
    try {
        return JSON.parse(localStorage.getItem('studentName')).first;
    }catch (e) {
        return ''
    }
};

const cachedStudentId = () => {
    try {
        return JSON.parse(localStorage.getItem('studentId')).first;
    }catch (e) {
        return ''
    }
};

module.exports.cachedStudentGpa = cachedStudentGpa;
module.exports.cachedStudentName = cachedStudentName;
module.exports.cachedStudentId = cachedStudentId;