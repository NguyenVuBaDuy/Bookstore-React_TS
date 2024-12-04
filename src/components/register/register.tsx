import { registerAPI } from "@/services/api.service";
import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd"
import type { FormProps } from 'antd';
import { useNavigate } from "react-router-dom";
const Register = () => {

    const [form] = Form.useForm()

    const navigate = useNavigate()

    type FieldType = {
        fullName: string;
        password: string;
        email: string;
        phone: string;
    }

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const { phone, email, fullName, password } = values
        const res = await registerAPI(fullName, email, password, phone)
        if (res?.data?._id) {
            message.success('Register successfully!')
            form.resetFields()
            navigate('/login')
        } else {
            notification.error({
                message: 'Register failed!',
                description: res.message
            })
        }
    }


    return (
        <Row className="row">
            <Col md={16} xs={24} lg={12} xl={8}>
                <div className="register-form">
                    <fieldset className="fieldset">

                        <legend><h2>Register</h2></legend>

                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={onFinish}
                            autoComplete="off"
                        >


                            <Form.Item<FieldType>
                                name="fullName"
                                label="Full name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter full name!"
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Enter your full name"
                                    className="input" />
                            </Form.Item>



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

                            <Form.Item<FieldType>
                                name="phone"
                                label="Phone number"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter phone number!"
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Enter your phone number"
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
                                onClick={() => { form.submit() }}>
                                Register
                            </Button>
                        </div>

                        <Divider />

                        <div className="register-footer">
                            Already have an account? <a onClick={() => { navigate('/login') }}>Login here</a>
                        </div>
                    </fieldset>
                </div>
            </Col>
        </Row>
    )
}

export default Register