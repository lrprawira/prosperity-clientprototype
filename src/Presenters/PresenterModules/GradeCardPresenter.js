import React from "react";
import GradeCardSS from '../Styles/GradeCardSS.module.css';

class GradeCardPresenter extends React.Component{
    showInstruction = (message) => {
        this.props.changeMessage(message, 1000);
    };

    render() {
        let grades = null;
        grades = this.props.courseGrade.map(grade => {
            return (
                <div
                    className={ GradeCardSS.gradeScores }
                    key={ this.props.courseUri.replace(/^.*STRM=/g, '').replace(/&.*$/) + this.props.courseUri.replace(/^.*CLASS_NBR=/g, '').replace(/&.*$/g, '') + grade.courseGradeType }
                >
                    <span>{ grade.courseGradeType }</span>
                    <span>{ parseFloat(grade.courseGradeValue) }</span>
                </div>
            );
        });
        return (
            <div className={ GradeCardSS.card }>
                <div className={ GradeCardSS.nameWrapper }>
                    <span className={ GradeCardSS.courseName }>
                        { this.props.courseName ? this.props.courseName.replace(/ ?\(?Kuliah\)? ?$/g, '') : null }
                    </span>
                    <span className={ GradeCardSS.courseTagWrapper }>
                        <span className={ GradeCardSS.courseTag } >
                            <span className={ GradeCardSS.courseCode } onClick={ () => this.showInstruction('Course Code') }>{ this.props.courseCode ? this.props.courseCode : null }</span>
                            {/*<span className={ GradeCardSS.courseTagTooltip }>*/}
                            {/*    Course Code*/}
                            {/*</span>*/}
                        </span>
                        <span className={ GradeCardSS.courseTag }>
                            <span className={ GradeCardSS.courseId }>{ this.props.courseId ? this.props.courseId : null }</span>
                            {/*<span className={ GradeCardSS.courseTagTooltip }>*/}
                            {/*    Course ID*/}
                            {/*</span>*/}
                        </span>
                        <span className={ GradeCardSS.courseTag }>
                            <span className={ GradeCardSS.courseNbr }>{ this.props.courseNbr ? this.props.courseNbr : null }</span>
                            {/*<span className={ GradeCardSS.courseTagTooltip }>*/}
                            {/*    Course Number*/}
                            {/*</span>*/}
                        </span>
                    </span>
                </div>
                <div className={ GradeCardSS.gradeWrapper }>
                    <div>
                        { grades }
                    </div>
                    <div className={ GradeCardSS.gradeGrade }>
                        ?
                    </div>
                </div>
            </div>
        );
    }
}

export default GradeCardPresenter;