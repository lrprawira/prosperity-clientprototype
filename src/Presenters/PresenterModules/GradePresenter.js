import React from "react";
import GradeCardPresenter from "./GradeCardPresenter";
import '../Styles/GradeSS.css';

class GradePresenter extends React.Component {
    state = {
        selectedTerm: localStorage.getItem('termIndex') || 0,
    };

    componentDidMount() {
        // try{
        //     if (JSON.parse(localStorage.getItem('studentCourse')).first !== ''){
        //         this.setState({
        //             selectedTerm: JSON.parse(localStorage.getItem('studentGrade')).first.length - 1
        //         });
        //     }
        // }catch (e) {
        //     return
        // }
    };

    changeTerm = (event) => {
        this.setState({selectedTerm: event.target.value});
        localStorage.setItem('termIndex', event.target.value);
    };

    checkGradeCache = () => {
        // if (localStorage.getItem('studentGrade') === '')
        //     return 1;
        // return 0;

        if (JSON.parse(localStorage.getItem('studentGrade')) === null)
            return 1;
        return 0;
    }

    render() {
        let gradeElements = null;
        let termElements = null;

        const gradeCardFn = () => {
            const gradeCardError = (
                <div className={ 'pageError' }>
                    <div className={ 'pageErrorAlert' }>No Grade Fetched</div>
                    <span className={ 'pageErrorDesc' }>No need to panic, try reloading the cache</span>
                </div>
            );
            try {
                const studentGrades = JSON.parse(localStorage.getItem('studentCourse')).first[this.state.selectedTerm].courseList;
                if (studentGrades === '' || studentGrades === 0)
                    gradeElements = (gradeCardError);
                else
                    gradeElements = (
                        <div className={ 'gradeElemWrapper' }>
                            {studentGrades.map(grades => {
                                return <GradeCardPresenter courseName={ grades.courseFullName }
                                                           courseCode={ grades.courseCode }
                                                           courseNbr={ grades.courseNbr }
                                                           courseId={ grades.courseId }
                                                           courseGrade={ grades.courseGrade }
                                                           courseUri={ grades.courseUri }
                                                           key={ grades.courseUri.replace(/^.*STRM=/g, '').replace(/&.*$/) + grades.courseUri.replace(/^.*CLASS_NBR=/g, '').replace(/&.*$/g, '') } />
                            })}
                        </div>
                    );
            }catch (e) {
                gradeElements = (gradeCardError);
            }
        };
        const termList = () => {
            try {
                const studentTerms = JSON.parse(localStorage.getItem('studentCourse')).first;
                if (studentTerms === '' || studentTerms === 0)
                    termElements = (
                        <select>
                            <option>
                                No Term Fetched
                            </option>
                        </select>
                    );
                else
                    termElements = (
                        <select onChange={this.changeTerm.bind(this)} value={this.state.selectedTerm} >
                            {
                                studentTerms.map(term => {
                                return <option key={ studentTerms.indexOf(term) }
                                               value={ studentTerms.indexOf(term) }>{ term.termName }</option>
                                })
                            }
                        </select>
                    );
            }catch (e) {
                termElements = (
                    <select>
                        <option>
                            No Term Fetched
                        </option>
                    </select>
                );
            }
        }
        gradeCardFn();
        termList();

        let cardContainerStyle = {}
        if (!this.checkGradeCache())
            cardContainerStyle = {
                marginTop: '64px'
            }

        return (
                <div className={ 'gradeRoot' }>
                    <div className={ 'termSelector' }>
                        <span>Term:</span>
                        {termElements}
                    </div>
                    <div className={ 'cardContainer' } style={ cardContainerStyle } >
                        {gradeElements}
                    </div>
                </div>
            );
        }
}

export default GradePresenter;