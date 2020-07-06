import React from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/react';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'mobx-react';
import { Switch, Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import ErrorBoundary from './components/ErrorBoundary/index';
import Home from '../src/pages/Home/index';
import Login  from '../src/pages/User/login';
import Stores from './mobx/rootStore';
import './styles/index.less';

const history = createHashHistory();
dayjs.locale('zh-cn');

if (module.hot) {
    module.hot.accept();
}

Sentry.init({ dsn: "https://11f12914dc114782b37d9d94c8839a40@o414598.ingest.sentry.io/5304319" });

ReactDOM.render(
    <ConfigProvider locale={zh_CN}>
        <Provider {...Stores}>
            <Router history={history}>
                <Switch>
                    <Route path="/user/login" exact component={Login} />
                    <ErrorBoundary>
                        <Home />
                    </ErrorBoundary>
                </Switch>
            </Router>
        </Provider>
    </ConfigProvider>,
    document.getElementById('root')
);
