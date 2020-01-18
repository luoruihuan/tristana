import React, { Component } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import './index.less';

const menu = (
    <Menu>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href={false}>
                退出
            </a>
        </Menu.Item>
    </Menu>
);

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <section className="layoutHeader">
                <div className="headeLeft">
                    订单系统
                </div>
                <div className="headerRight">
                    <span className="message">消息</span>
                    <Dropdown className="dropDown" overlay={menu}>
                        <div>
                            <Avatar className="avatar" size={28} icon="user" />
                            <span className="name">Faker</span>
                        </div>
                    </Dropdown>
                </div>
            </section>
        );
    }
}

export default Index;
