import React, { useState } from 'react';
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { LogIn } from '../service';
import { connect } from 'react-redux';
import { ChangeScreenAction } from '../actions';
import { screens } from '../constants';

const Login = (props) => {
    const [isLogin, toggleLogin] = useState(true);
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = (values) => {
        LogIn(values.email, values.password)
        .then(response => {
            if(response.error) {
                error(response.error)
            } else {
                localStorage.setItem("token", response.token)
                localStorage.setItem("user", JSON.stringify(response.user))
                props.dispatch(ChangeScreenAction(screens.EXPENSES))
            }
        })
    };

    const error = (message) => {
        messageApi.open({
          type: 'error',
          content: message,
        });
    };

    return (
        <div className='login-container'>
            {contextHolder}
            <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
                size='large'
            >
                <div style={{textAlign: 'center', marginBottom: '30px', marginTop: '30px'}}>
                   {isLogin ? <h2>Welcome back!</h2> : <h2>Welcome!</h2>}
                </div>
                {!isLogin &&
                    <Form.Item
                        name="ame"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your full name',
                        },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
                    </Form.Item>
                }
                <Form.Item
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your email address',
                    },
                    ]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Email Address" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Password!',
                    },
                    ]}
                >
                    <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                    />
                </Form.Item>

                <Form.Item className="login-form-button" style={{textAlign: 'center', marginBottom: '0px'}}>
                    <Button type="primary" htmlType="submit">
                        {isLogin ? "Log in" : "Sign up"}
                    </Button>
                </Form.Item>
            </Form>
            <div style={{marginTop: '30px', display: 'flex'}}>
                <div>{!isLogin ? "Already have an account?" : "New User?"}</div>
                <div style={{marginLeft: '10px', color: 'blue'}} onClick={() => toggleLogin(!isLogin)}>{!isLogin ? "Log in" : "Sign up"}</div>
            </div>
        </div>
    );
}


const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
	dispatch
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);