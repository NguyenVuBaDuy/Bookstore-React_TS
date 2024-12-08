import { createUserAPI } from "@/services/api.service";
import { Form, Input, message, Modal, notification } from "antd";
import type { ActionType } from '@ant-design/pro-components';

interface IProps {
    setIsOpenModalCreateUser: (v: boolean) => void;
    isOpenModalCreateUser: boolean;
    actionRef: React.MutableRefObject<ActionType | undefined>;
}

interface IValues {
    fullName: string;
    email: string;
    password: string;
    phone: string;
}

const CreateUser = (props: IProps) => {

    const { isOpenModalCreateUser, setIsOpenModalCreateUser, actionRef } = props;

    const [form] = Form.useForm();

    const handleCreateUser = async (values: IValues) => {
        if (values) {
            const { email, fullName, password, phone } = values
            const res = await createUserAPI(fullName, email, password, phone)
            if (res.data) {
                message.success('Create User Successfully')
                setIsOpenModalCreateUser(false)
                form.resetFields()
                actionRef.current?.reload()
            } else {
                notification.error({ message: "Create User Failed!", description: res.message })
            }
        }
    }

    return (
        <Modal
            title="Create User"
            open={isOpenModalCreateUser}
            onOk={() => { form.submit() }}
            onCancel={() => {
                setIsOpenModalCreateUser(false)
                form.resetFields()
            }}
            centered
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={handleCreateUser}
                autoComplete="off"
            >
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: "Please enter your full name" }]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        { required: true, message: "Please enter your full name" },
                        { type: "email", message: "Invalid email" }
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: "Please enter your password" }]}>
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone number"
                    rules={[{ required: true, message: "Please enter your phone number" }]}>
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default CreateUser