import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { HelmetProvider } from "react-helmet-async";
import './Styles/404SS.css';

import AuthPresenter from './PresenterModules/AuthPresenter';

class MainView extends React.Component{
    render() {
        return(
            <HelmetProvider>
                <BrowserRouter>
                    <div className={'fullApp'}>
                        <AuthPresenter/>
                    </div>
                </BrowserRouter>
            </HelmetProvider>
        );
    }
}

export default MainView;