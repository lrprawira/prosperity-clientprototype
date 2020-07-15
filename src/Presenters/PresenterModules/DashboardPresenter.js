import React from "react";
import { Helmet } from "react-helmet";
import { Redirect, Route, NavLink, Switch } from "react-router-dom";

import { loginCheck, handleLogout } from '../../Models/ConnectionsModel';
import { syncData, isCacheEmpty } from '../../Models/CacheHandler';
import cacheFetcher from '../../Models/CacheFetcher';
import DashboardSS from '../Styles/DashboardSS.module.css';
import '../Styles/DashboardSS.css'

import GradePresenter from './GradePresenter';
import CoursePresenter from './CoursePresenter';

class DashboardPresenter extends React.Component {
    state = {
        logout: false,
        message: '',
        isRefreshing: false,
        isNavOpen: false,
        lastDimension: {
            width: 0,
            height: 0
        }
    };

    messagePromise = undefined;

    logMeOut = () => {
        localStorage.clear();
        handleLogout();
        this.setState({ logout: true });
    }

    addDelay = (delay) => {
        return new Promise(callback => {
            setTimeout(() => {
                callback();
            }, delay)
        });
    };

    forceReload = async () => {
        if (!this.state.isRefreshing && !this.messagePromise) {
            this.setState({isRefreshing: true});
            this.setState({message: 'Synchronising Database...'});
            const reloadResult = await syncData();
            if (reloadResult === 1)
                this.setState({message: 'Sync Failed!'})
            else
                this.setState({message: 'Sync Successful!'})
            this.setState({
                isRefreshing: false
            });

            this.messagePromise = await this.addDelay(5000);
            if (this.state.message === 'Sync Failed!' || this.state.message === 'Sync Successful!')
                this.setState({
                    message: ''
                });
        }
    };

    changeMessage = async (message, delay) => {
        clearTimeout(this.messagePromise);
        this.setState({ message: message });
        this.messagePromise = await this.addDelay(delay);
        if (this.state.message === message)
            this.setState({
                message: ''
            });
    };

    switchNavOpen = () => {
        this.setState({isNavOpen: ! (this.state.isNavOpen)});
    };

    checkNav = () => {
        if (this.state.lastDimension.width >= 900)
            this.setState({isNavOpen: false});
    };

    updateDimension = () => {
        this.setState({lastDimension: {
                width: window.innerWidth,
                height: window.innerHeight
        }});
        this.checkNav();
    }

    componentDidMount() {
        if (isCacheEmpty()) // Refresh on load
            this.forceReload();
        window.addEventListener('resize', this.updateDimension);
        this.updateDimension();
    }

    componentWillUnmount() {
        if (!this.messagePromise)
            clearTimeout(this.messagePromise);
    }

    render() {
        if (!loginCheck() || this.state.logout){ // Check cookie existence
            this.setState({ logout: false });
            return <Redirect to={{
                pathname: '/'
            }} />;
        }

        if (this.props.location.pathname === '/dashboard/' || this.props.location.pathname === '/dashboard') // Redirect to /courses by default
            return <Redirect to={'/dashboard/courses'} />

        const navSideStyle = [DashboardSS.navside];
        if (this.state.isNavOpen)
            navSideStyle.push(DashboardSS.navsideShow);

        return (
            <div className={DashboardSS.dashboard}>
                <Helmet>
                    <title>Prosperity for UPH Academic</title>
                </Helmet>
                <div className={DashboardSS.splitpage}>
                    <div className={navSideStyle.join(' ')}>
                        <h2 className={DashboardSS.projectLogo}>Prosperity</h2>
                        <div className={DashboardSS.menuList}>
                            <NavLink to={{
                                pathname: this.props.match.path + '/courses' || this.props.match.path + '/' ,
                            }} exact>
                                <span>Courses</span>
                            </NavLink>
                            <NavLink to={{
                                pathname: this.props.match.path + '/grade'
                            }}>
                                <span>Grade</span>
                            </NavLink>
                            <NavLink to={{
                                pathname: this.props.match.path + '/finance'
                            }}>
                                <span>Finance</span>
                            </NavLink>
                        </div>
                        <div
                            className={DashboardSS.navFooter}>
                            <div content={'footer-settings'}>
                                <span>
                                    Settings
                                </span>
                            </div>
                            <div onClick={this.logMeOut} content={'footer-logout'}>
                                <span>
                                    Logout
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className={DashboardSS.bodyside}>
                        <div className={DashboardSS.headerside}>
                            <div className={DashboardSS.headerLeft}>
                                <div className={DashboardSS.headerMenu} onClick={this.switchNavOpen}>Menu</div>
                                <div className={DashboardSS.headerStatus}>{ this.state.message || 'Prosperity Client is idle' }</div> {/* Status Message via State */}
                            </div>
                            <div className={DashboardSS.headerControl}>
                                <div className={DashboardSS.headerRefresh} onClick={this.forceReload}>
                                    Reload
                                </div>
                                <div className={DashboardSS.headerGpa}>
                                    <p className={DashboardSS.gpaTitle}>GPA</p>
                                    <p className={DashboardSS.gpaNumber}>{ cacheFetcher.cachedStudentGpa() || '0.00' }</p>
                                </div>
                                <div className={DashboardSS.headerUser}>
                                    <p className={DashboardSS.userName}>{ cacheFetcher.cachedStudentName().toLowerCase() || 'Demo User' }</p>  {/* User Name */}
                                    <p className={DashboardSS.userId}>{ cacheFetcher.cachedStudentId() || 'DU012345678' }</p>  {/* User ID */}
                                </div>
                            </div>
                        </div>
                        <div className={DashboardSS.miniStatus}>
                            { this.state.message || 'Prosperity Client is idle' }
                        </div>
                        <div className={DashboardSS.contentside}>
                            <Switch>
                                <Route path={this.props.match.path + '/courses'}
                                       component={CoursePresenter}
                                />
                                <Route path={this.props.match.path + '/finance'}
                                />
                                <Route path={this.props.match.path + '/grade'}
                                       changeMessage={ (message, delay) => this.changeMessage(message, delay) }
                                       component={GradePresenter}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashboardPresenter;