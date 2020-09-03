/*
 * 私有路由页面
 * @Author: Jiang
 * @Date: 2020-03-11 21:42:00
 * @Last Modified by: Jiang
 * @Last Modified time: 2020-09-03 13:51:27
 */

import React, { lazy, ReactType } from 'react';
import { Route, withRouter } from 'react-router-dom';

// const Error = lazy(() => import(/* webpackChunkName: "Error"*/'@pages/User/error'));

interface IProps {
    history: {
        replace(url: string): void;
    },
    routes?(url: string): void,
    path?: string,
    exact?: boolean,
    strict?: boolean,
    component?: any
}

interface IState {
    isAuthenticated: boolean
}

class PrivateRoute extends React.Component<IProps, IState> {

    constructor(props) {
        super(props);
        this.state = { isAuthenticated: true };
    }

    componentDidMount() {
        let isAuthenticated = localStorage.token ? true : false;
        this.setState({ isAuthenticated });

        if (!isAuthenticated) {
            const { history } = this.props;
            setTimeout(() => {
                history.replace('/user/login');
            }, 1000);
        }
    }

    render() {
        let { component, path = '/', exact = false, strict = false } = this.props;
        const Comp: ReactType = this.props.component;
        return (
            <Route
                path={path}
                exact={exact}
                strict={strict} render={(props) => (<Comp {...props} routes={this.props.routes} />)}
            />
        );
    };
}

export default withRouter(PrivateRoute);