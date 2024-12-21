import { Button, Col, Result, Row, Steps } from "antd"
import Order from "@/components/client/order/order-list/order"
import { useEffect, useState } from "react"
import 'pages/client/order.page/order.scss'
import { useSelector } from "react-redux"
import SideBarOrder from "components/client/order/order-sidebar/sidebar.order"
import Checkout from "components/client/order/order-list/checkout"
import SidebarCheckout from "components/client/order/order-sidebar/sidebar.checkout"
import { SmileOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"

const OrderPage = () => {

    const [current, setCurrent] = useState<number>(0)
    const cart = useSelector((state: IRedux) => state.order.cart)
    const [total, setTotal] = useState<number>(0)
    const navigate = useNavigate()

    useEffect(() => {
        if (cart.length) {
            const totalPrice = cart.reduce((acc: number, item: any) => {
                acc += item.quantity * item.detail.price
                return acc
            }, 0)
            setTotal(totalPrice)
        } else setTotal(0)
    }, [cart])

    return (
        <div
            style={{
                minHeight: "calc(100vh - 123.4px)",
                backgroundColor: '#efefef',
                padding: "20px 0",
                boxSizing: 'border-box'
            }
            }>
            <div className="orderpage-container" style={{ maxWidth: 1440, margin: '0 auto' }}>
                <Row>
                    <Col md={24}>
                        <div style={{ padding: "20px 15px", backgroundColor: 'white', borderRadius: "5px", marginBottom: "25px" }}>
                            <Steps
                                size="small"
                                current={current}
                                items={[
                                    {
                                        title: 'Order',
                                    },
                                    {
                                        title: 'Checkout',
                                    },
                                    {
                                        title: 'Done',
                                    },
                                ]}
                            />
                        </div>
                    </Col>
                </Row>
                <Row gutter={[20, 20]}>
                    {current >= 2 ?
                        <div style={{ width: "100%" }}>
                            <Row >
                                <Col sm={24}>
                                    <Result
                                        icon={<SmileOutlined />}
                                        title="Your order has been successfully placed!"
                                        extra={<Button type="primary"
                                            onClick={() => { navigate('/history') }}
                                        >View order history</Button>}
                                    />
                                </Col>

                            </Row>
                        </div>
                        :
                        <>
                            <Col lg={18} xs={0}>
                                {current === 0 && <Order current={current} />}
                                {current === 1 && <Checkout />}
                            </Col>
                            <Col lg={6} xs={24}>
                                {current === 0 && <SideBarOrder total={total} setCurrent={setCurrent} />}
                                {current === 1 && <SidebarCheckout total={total} setCurrent={setCurrent} />}
                            </Col>
                        </>
                    }
                </Row>
            </div>
        </div>
    )
}

export default OrderPage