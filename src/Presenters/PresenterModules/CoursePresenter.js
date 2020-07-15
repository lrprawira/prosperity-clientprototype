import React from "react";
import '../Styles/CourseSS.css';

class CoursePresenter extends React.Component{
    getCourseName = (courseCode) => {
        courseCode.replace(/ +/, ' '); // Normalize spaces in case any exists
        try {
            const courses = JSON.parse(localStorage.getItem('studentCourse')).first;
            // console.log(courses[courses.length-1].courseList);
            for (let course of courses[courses.length - 1].courseList) {
                if (course.courseCode === courseCode)
                    return course.courseFullName.replace(/ ?\( ?Kuliah ?\) ?$/i, '');
            }
        } catch (e) {
            console.log('Caught');
        }
        return 'Unknown Course';
    };
    alterCourseLocation = (courseLoc) => {
        const modifiedLoc1 = courseLoc.replace(/^(?:gedung)? ?/i, '')
        try {
            const modifiedLoc2 = modifiedLoc1.match(/\b(\w)\s\1\b(.*)/);
            return modifiedLoc2[1] + modifiedLoc2[2];
        } catch {
            return modifiedLoc1;
        }
    };
    render() {
        let courses = null;
        const courseError = (
            <div className={ 'pageError' }>
                <div className={ 'pageErrorAlert' }>No Grade Fetched</div>
                <span className={ 'pageErrorDesc' }>No need to panic, try reloading the cache</span>
            </div>
        );
        const courseMap = () => {
            try {
                const studentSchedule = JSON.parse(localStorage.getItem('studentSchedule')).first;
                if (studentSchedule === '' || studentSchedule === 0)
                    courses = (courseError);
                courses = (
                    <div className={'scheduleContainer'}>
                        { studentSchedule.map( schedule => {
                                if (schedule.length > 1 && ( new Date(schedule.scheduleDay) >= new Date() ))
                                    return (
                                        <ul className={'studentScheduleDay'}
                                            key={'studentScheduleDay' + studentSchedule.indexOf(schedule)}>
                                            {
                                                schedule.map(sched => {
                                                    if (schedule.indexOf(sched) === 0)
                                                        return (<span className={'dateSched'}>
                                                            <span className={'dayDateSched'}>
                                                                {sched.dateSchedule.slice(0, 3)}
                                                            </span>
                                                            <span className={'dateDateSched'}>
                                                                {sched.dateSchedule.replace(/^\w+ \w+ /, '')}
                                                            </span>
                                                            <span className={'dateSchedSeparator'}>/</span>
                                                            <span className={'monDateSched'}>
                                                                {new Date(Date.parse(sched.dateSchedule.replace(/^\w+ /, '').replace(/ \w+$/, '') + '1 2042')).getMonth() + 1}
                                                            </span>
                                                        </span>);
                                                    else
                                                        return (<li className={'studentScheduleList'}>
                                                            <div className={'courseFullNameList'}>
                                                                {this.getCourseName(sched.courseCode)}
                                                            </div>
                                                            <div className={'courseTimeList'}>
                                                                <span> {sched.courseStart} </span>
                                                                <span
                                                                    className={'studentScheduleTag'}> {sched.courseCode} </span>
                                                            </div>
                                                            <div className={'courseLocationList'}>
                                                                {this.alterCourseLocation(sched.courseLoc)}
                                                            </div>
                                                        </li>);
                                                })
                                            }
                                        </ul>
                                    );
                                else
                                    return null;
                            })
                        }
                    </div>
                );
            }catch (e) {

            }
        }
        courseMap();
        return (
            <div className={'courseRoot'}>
                {courses}
            </div>
        );
    }
}

export default CoursePresenter;