import React from "react";
import { Route, Switch } from "react-router-dom";

import DashboardPresenter from "./DashboardPresenter";
import LoginPresenter from "./LoginPresenter";

class AuthPresenter extends React.Component {
    render() {
        return (
            <div style={{
                height: 'inherit',
                width: 'inherit'
            }}>
                <Switch>
                    <Route path={'/dashboard'}
                           component={DashboardPresenter}
                    />
                    <Route path={'/'}
                           exact
                           component={LoginPresenter}
                    />
                </Switch>

            </div>
        );
    }
}

export default AuthPresenter;