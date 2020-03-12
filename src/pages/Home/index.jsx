import React, { Component, Suspense } from 'react';
import {
    Switch,
    Redirect,
    Router
} from 'react-router-dom';
import { Layout } from 'antd';
import { createHashHistory } from 'history';
import { agentOnline, onConnect, removeAllListeners, disconnect, agentOffline } from '../../components/Socket/index';
import LayoutHeader from '../../components/LayoutHeader/index';
import Menu from './components/menu';
import * as stores from '../../mobx/rootStore';
import routeConfig from '../../routeConfig';
import './index.less';

const { Header, Content, Sider } = Layout;

const history = createHashHistory();
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        agentOffline();
        disconnect();
        removeAllListeners();
        // socket 注册
        agentOnline();
        onConnect();
        console.log(333);
    }

    render() {
        return (
            <Router history={history} {...stores}>
                <Layout className="homeLayout">
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            left: 0
                        }}
                        theme="light"
                    >
                        <div className="logo" />
                        <Menu />
                    </Sider>
                    <Layout>
                        <Header className="header">
                            <LayoutHeader />
                        </Header>
                        <Content className="homeContent">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Switch>
                                    {routeConfig}
                                    <Redirect
                                        from="/*"
                                        to="/user/login"
                                    />
                                </Switch>
                            </Suspense>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Index;
