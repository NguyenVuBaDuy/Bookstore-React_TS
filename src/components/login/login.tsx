import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import type { FormProps } from 'antd';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "services/api.service";

type FieldType = {
    email: string;
    password: string;
}

const Login = () => {

    const [form] = Form.useForm()

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setIsLoading(true)
        const { email, password } = values
        const res = await loginAPI(email, password)
        if (res.data) {
            message.success('Login successfully')
            navigate('/')
            localStorage.setItem('access_token', res.data.access_token)
        } else {
            notification.success({
                message: "Login failed!",
                description: res.message
            })
        }
        setIsLoading(false)
    }

    return (
        <Row className="row">
            <Col md={16} xs={24} lg={12} xl={8}>
                <div className="login-form">
                    <fieldset className="fieldset">

                        <legend><h2>Login</h2></legend>

                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <Form.Item<FieldType>
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter email!"
                                    },
                                    {
                                        type: 'email',
                                        message: "Email is incorrect format!"
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter your email"
                                    className="input" />
                            </Form.Item>

                            <Form.Item<FieldType>
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter password!"
                                    },
                                ]}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    className="input" />
                            </Form.Item>

                        </Form>

                        <div className="option">
                            <a onClick={() => { navigate('/') }}>
                                <ArrowLeftOutlined /> Go to home page
                            </a>

                            <Button
                                color="primary"
                                variant="solid"
                                onClick={() => { form.submit() }}
                                loading={isLoading}
                            >
                                Login
                            </Button>
                        </div>

                        <Divider />

                        <div className="login-footer">
                            Don't have an account? <a onClick={() => { navigate('/register') }}>Register here</a>
                        </div>
                    </fieldset>
                </div>
            </Col>
        </Row>
    )
}

export default Login