import React from "react";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";

import { loginCheck, handleLogout } from '../../Models/ConnectionsModel';
import DashboardSS from '../Styles/DashboardSS.module.css';

class HomePresenter extends React.Component{
    state = {
        logout: false
    };

    logMeOut = () => {
        handleLogout();
        this.setState({logout: true});
    }

    render() {
        if (!loginCheck() || this.state.logout){ // Check cookie existence
            this.setState({logout: false});
            return <Redirect to={{
                pathname: '/'
            }} />;
        }

        return (
            <div className={DashboardSS.dashboard}>
                <Helmet>
                    <title>Prosperity for UPH Academic</title>
                </Helmet>
                <div className={DashboardSS.splitpage}>
                    <div className={DashboardSS.navside}>
                        <h2 className={DashboardSS.projectLogo}>Prosperity</h2>
                        <div className={DashboardSS.menuList}>
                            <div>
                                <span>Courses</span>
                            </div>
                            <div>
                                <span>Finance</span>
                            </div>
                        </div>
                        <div
                            className={DashboardSS.navFooter}>
                            <div onClick={this.logMeOut}>
                                <span>
                                    Logout
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className={DashboardSS.bodyside}>
                        <div className={DashboardSS.headerside}>

                        </div>
                        <div className={DashboardSS.contentside}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePresenter;