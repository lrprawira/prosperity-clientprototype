import React from "react";

const Error = props => {
    let errorMessage = null;
    switch (props.status) {
        case 'not-implemented':
            errorMessage = `Error 503: View ${props.currView} is not implemented yet`;
            break;
        case 'not-found':
            errorMessage = `Error 404: View ${props.currView} could not be found`;
            break;
        default:
            errorMessage = `Error 500: Internal Server Error`;
    }
    return(
        <div className={'error-msg'}>
            {errorMessage}
        </div>
    );
};

export default Error;