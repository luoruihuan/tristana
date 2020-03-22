import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'mobx-react';
import { Switch, Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import Home from '../src/pages/Home/index';
import Login  from '../src/pages/User/login';
import Stores from './mobx/rootStore';
import './styles/index.less';

const history = createHashHistory();
dayjs.locale('zh-cn');

ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <Provider {...Stores}>
            <Router history={history}>
                <Switch>
                    <Route path="/user/login" exact component={Login} />
                    <Home />
                </Switch>
            </Router>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);
