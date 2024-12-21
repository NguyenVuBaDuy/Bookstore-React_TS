import { doResetCartAction } from "@/redux/order/orderSlice";
import { createOrderAPI } from "@/services/api.service";
import { Divider, Form, Input, message, notification } from "antd"
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"

interface IProps {
    total: number;
    setCurrent: (v: number) => void
}

interface IOrderDetail {
    quantity: number;
    _id: string;
    detail: IBookTable
}

interface IData {
    name: string;
    address: string;
    phone: string;
    totalPrice: number;
    detail: {
        bookName: string;
        quantity: number;
        _id: string;
    }[];
}

const SidebarCheckout = (props: IProps) => {

    const { total, setCurrent } = props
    const cart = useSelector((state: IRedux) => state.order.cart)
    const user = useSelector((state: IRedux) => state.account.user)
    const dispatch = useDispatch()
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({
            fullName: user.fullName,
            phone: user.phone
        })
    }, [])

    const handleCreateOrder = async (values: any) => {
        if (values) {
            const orderDetail = cart.map((item: IOrderDetail) => {
                return {
                    bookName: item.detail.mainText,
                    quantity: item.quantity,
                    _id: item._id
                }
            })

            const data: IData = {
                name: values.fullName,
                address: values.address,
                phone: values.phone,
                totalPrice: total,
                detail: orderDetail
            }

            const res = await createOrderAPI(data)
            if (res.data) {
                message.success("Order Successfully")
                dispatch(doResetCartAction())
            } else {
                notification.error({
                    message: "Order Failed",
                    description: res.message
                })
            }
            setCurrent(2)
        }
    }

    return (
        <div className="bill">
            <Form
                layout="vertical"
                form={form}
                name="control-hooks"
                onFinish={(values) => { handleCreateOrder(values) }}
            >
                <Form.Item
                    name="fullName"
                    label="Full name"
                    rules={[{ required: true, message: "Please enter your full name" }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[{ required: true, message: "Please enter your phone" }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="address"
                    label="Address"
                    rules={[
                        {
                            required: true,
                            message: "Please enter your address!"
                        },
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
            <Divider />
            <div className="subtotal">
                <div>Subtotal</div>
                <div className="price">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                </div>
            </div>
            <Divider />
            <div className="total">
                <div>Total</div>
                <div className="price">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}
                </div>
            </div>
            <Divider />

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button onClick={() => { setCurrent(0) }}
                    style={{
                        boxSizing: "border-box",
                        backgroundColor: "white",
                        color: '#4096FF',
                        border: '1px solid #4096FF',
                        width: "calc(30% - 10px)"
                    }}>Back</button>
                <div className="button-buy"
                    style={{ width: 'calc(70% - 10px)' }}
                    onClick={() => { form.submit() }}>
                    <button>Confirm ({cart?.length})</button>
                </div>
            </div>

        </div>
    )
}

export default SidebarCheckout