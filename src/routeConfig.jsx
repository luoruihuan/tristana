// 路由配置文件
import React, { lazy } from 'react';
import PrivateRoute from './components/PrivateRoute/index';

const Dashboard = lazy(() => import(/* webpackChunkName: "Dashboard"*/'./pages/Dashboard/index'));
const AddGoods = lazy(() => import(/* webpackChunkName: "AddGoods"*/'./pages/AddGoods/index'));
const Counter = lazy(() => import(/* webpackChunkName: "Counter"*/'./pages/Counter/index'));
const Login = lazy(() => import(/* webpackChunkName: "Login"*/'./pages/User/login'));

const routes = [
    {
        // 登录页
        path: '/user/login',
        component: Login
    },
    {
        // 仪表盘页
        path: '/dashboard',
        component: Dashboard
    },
    {
        // 添加商品页
        path: '/add/goods',
        component: AddGoods
    },
    {
        // 计数器页
        path: '/counter',
        component: Counter
    }
];

const RouteWithSubRoutes = route => {
    return <PrivateRoute exact path={route.path} component={route.component} />;

    // return (
    //     <Route
    //         exact
    //         path={route.path}
    //         render={props => (
    //             <route.component {...props} />
    //         )}
    //     />
    // );
};

const routeConfig = routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />);
export default routeConfig;
