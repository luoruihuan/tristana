import React, { Component } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { Avatar, Dropdown, Menu } from 'antd';
import './index.less';

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        const { history } = this.props;
        localStorage.token = '';
        history.replace('/user/login');
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