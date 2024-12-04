import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Col, Divider, Form, Input, Row } from "antd"

const Register = () => {

    const [form] = Form.useForm()

    return (
        <Row className="row">
            <Col md={16} xs={24} lg={12} xl={8}>
                <div className="register-form">
                    <fieldset className="fieldset">

                        <legend><h2>Register</h2></legend>

                        <Form
                            layout="vertical"
                            form={form}
                            onFinish={() => { }}
                            autoComplete="off"
                        >
                            <Form.Item
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

                            <Form.Item
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

                            <Form.Item
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

                            <Form.Item
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
                            <a href="#">
                                <ArrowLeftOutlined /> Go to home page
                            </a>

                            <Button color="primary" variant="solid">
                                Register
                            </Button>
                        </div>

                        <Divider />

                        <div className="register-footer">
                            Already have an account? <a href="#">Login here</a>
                        </div>
                    </fieldset>
                </div>
            </Col>
        </Row>
    )
}

export default Register