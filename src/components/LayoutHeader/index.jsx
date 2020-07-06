import React, { Component } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from 'antd';
import intl from 'react-intl-universal';
import './index.less';

const locales = {
    "en-US": require('../../locales/en_US.json'),
    "zh-CN": require('../../locales/zh-CN.json')
};

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = { initDone: false };
        this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.loadLocales();
    }

    signOut() {
        const { history } = this.props;
        localStorage.token = '';
        history.replace('/user/login');
    }

    loadLocales() {
        // init method will load CLDR locale data according to currentLocale
        // react-intl-universal is singleton, so you should init it only once in your app
        intl.init({
            currentLocale: 'en-US', // TODO: determine locale here
            locales
        }).then(() => {
            // After loading CLDR locale data, start to render
            this.setState({initDone: true});
        });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href={false} onClick={this.signOut}>
                        退出
                    </a>
                </Menu.Item>
            </Menu>
        );
        return (
            <section className="layoutHeader">
                <div className="headeLeft">
                    订单系统
                </div>
                {
                    this.state.initDone &&
                    <div>
                        {intl.get('SIMPLE')}
                    </div>
                }
                <div className="headerRight">
                    <span className="message">消息</span>
                    <Dropdown className="dropDown" overlay={menu}>
                        <div>
                            <Avatar className="avatar" size={28} icon={<UserOutlined />} />
                            <span className="name">Faker</span>
                        </div>
                    </Dropdown>
                </div>
            </section>
        );
    }
}

export default withRouter(Index);