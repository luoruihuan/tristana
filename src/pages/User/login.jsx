/*
 * 登录页面
 * @Author: Jiang
 * @Date: 2019-06-13 16:45:59
 * @Last Modified by: Jiang
 * @Last Modified time: 2020-03-26 06:32:40
 */

import React, { Component } from 'react';
import { Form, Input, Button, Icon, Checkbox } from 'antd';
import './login.less';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    // 表单提交
    handleSubmit = e => {
        e.preventDefault();
        const { form, history } = this.props;
        form.validateFields((err) => {
            if (!err) {
                localStorage.token = 'login';
                history.push('/dashboard');
            }
        });
    }

    // 表单
    fieldDecorator = () => {
        const { form } = this.props;
        const formProps = {
            // 用户名
            loginName: form.getFieldDecorator('loginName', {
                rules: [
                    {
                        required: true,
                        message: '请输入账号'
                    }
                ]
            }),
            // 密码
            password: form.getFieldDecorator('password', {
                rules: [
                    {
                        required: true,
                        message: '请输入密码'
                    }
                ]
            }),
            // 密码
            remember: form.getFieldDecorator('remember')
        };
        return formProps;
    }

    render() {
        const formProps = this.fieldDecorator();
        return (
            <main className="login">
                <Form
                    onSubmit={this.handleSubmit}
                    className="login-form"
                >
                    <Form.Item>
                        {
                            formProps.loginName(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    size="large"
                                    addonBefore="账号"
                                    placeholder="请输入账号"
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            formProps.password(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    size="large"
                                    type="password"
                                    addonBefore="密码"
                                    placeholder="请输入密码"
                                />
                            )
                        }
                    </Form.Item>
                    <Form.Item>
                        <article className="login-form-remember">
                            {
                                formProps.remember(
                                    <Checkbox>Remember me</Checkbox>
                                )
                            }
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </article>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button login-btn">
                            Log in
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <article className="register">
                            Or&nbsp;<a href="">register now!</a>
                        </article>
                    </Form.Item>
                </Form>
            </main>
        );
    }
}

const LoginForm = Form.create({ name: 'login' })(Login);

export default LoginForm;