// 路由配置文件
import React, { lazy } from 'react';
import PrivateRoute from '@components/PrivateRoute/index';

const Login = lazy(() => import(/* webpackChunkName: "Login"*/'@pages/User/login'));

const routes = [
    {
        // 登录页
        path: '/user/login',
        component: Login
    }
];

const RouteWithSubRoutes = route => <PrivateRoute path={route.path} component={route.component} routes={route.routes} />;

const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
