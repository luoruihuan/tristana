// 路由配置文件
import React, { lazy } from 'react';
import PrivateRoute from '@components/PrivateRoute/index';

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard"*/'@pages/dashboard2/index'));
const Bus = lazy(() => import(/* webpackChunkName: "Bus"*/'@pages/bus2/index'));
const AddGoods = lazy(() => import(/* webpackChunkName: "AddGoods"*/'@pages/addGoods2/index'));
const Login = lazy(() => import(/* webpackChunkName: "Login"*/'@pages/user2/login'));
const Error = lazy(() => import(/* webpackChunkName: "Error"*/'@pages/user2/error'));

const routes = [
    {
        // 仪表盘页
        path: '/dashboard',
        component: Dashboard,
        routes: [
            {
                path: '/dashboard/bus',
                component: Bus
            }
        ]
    },
    {
        // 添加商品页
        path: '/add/goods',
        component: AddGoods
    },
    {
        // 登录页
        path: '/user/login',
        component: Login
    },
    {
        // 权限或者404页面
        path: '/error',
        component: Error
    }
];

const RouteWithSubRoutes = route => <PrivateRoute path={route.path} component={route.component} routes={route.routes} />;

const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
