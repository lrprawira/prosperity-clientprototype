import React from "react";
import { Route } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

import { handleLogin, loginCheck, handleLogout } from '../../Models/ConnectionsModel';
import MainView from "../MainView";
import HomePresenter from "./HomePresenter";
import LoginSS from '../Styles/LoginViewSS.module.css';

class LoginPresenter extends React.Component {
    onSubmit = (event) => {
        // noinspection JSIgnoredPromiseFromCall
        handleLogin(event);
        return <Route path={'/'}
                      component={MainView} />;
    }
    render() {
        const isLoggedIn = () => { // Check for login cookies function
            return loginCheck();
        }
        if (isLoggedIn()) { // if user is logged in, redirect to dashboard
            handleLogout();
            return <Route path={'/dashboard'}
                            component={HomePresenter}/>;
        }
        console.log(loginCheck());
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
        );
    }
}

export default LoginPresenter;