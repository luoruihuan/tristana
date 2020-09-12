import React from 'react';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'mobx-react';
import { Switch, Router, Route } from 'react-router-dom';
import { createHashHistory } from 'history';
import Login from '@pages/User/login';
import Stores from '@mobx/rootStore';
import Home from '@src/pages/Home/index';
import '@mock/mock';
import './styles/index.less';

const history = createHashHistory();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ConfigProvider locale={zh_CN}>
                <Provider {...Stores}>
                    <Router history={history}>
                        <Switch>
                            <Route path="/user/login" exact component={Login} />
                            <Home />
                        </Switch>
                    </Router>
                </Provider>
            </ConfigProvider>
        );
    }
}
