import React from "react";
import LoginSS from "../Styles/LoginViewSS.module.css";
import { Helmet } from "react-helmet-async";
import { handleLogin, loginCheck } from "../../Models/ConnectionsModel";
import { Redirect } from "react-router-dom";


class LoginPresenter extends React.Component {
    state = {
        isSubmitted: false
    };
    onSubmit = async (event) => {
        // noinspection JSIgnoredPromiseFromCall
        handleLogin(event);
        this.setState({isSubmitted: true});
    }
    render() {
        if (loginCheck()) // Check cookie existence
            return <Redirect to={{
                pathname: '/dashboard'
            }} />;
        if (this.state.isSubmitted) { // isSubmitted will only flip on submit
            this.setState({isSubmitted: false}) // Reload properly when get back to login
            return <Redirect to={{
                pathname: '/'
            }}/>;
        }
        return (
            <div className={LoginSS.loginScrollable}>
                <Helmet>
                    <title>Prosperity Login</title>
                </Helmet>
                <div className={LoginSS.loginFormWrapper}>
                    <h2 className={LoginSS.projectName}>プロスペリティー</h2>
                    <h3 className={LoginSS.loginPrompt}>Login to UPH Academic</h3>
                    <small>Caution: No credential validation will be performed</small>
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <input name={'userId'} placeholder={'Email Address'} type={'text'} spellCheck={'false'}
                               autoComplete={'on'}/>
                        <input name={'userPwd'} placeholder={'Password'} type={'password'} spellCheck={'false'}
                               autoComplete={'off'}/>
                        <button name={'submitBtn'} type={'submit'}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginPresenter;