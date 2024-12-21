import { doDeleteOrderAction, doUpdateOrderAction } from "@/redux/order/orderSlice";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux"

interface IProps {
    current: number;
}

interface ICart {
    quantity: number;
    _id: string;
    detail: IBookTable
}

const Order = (props: IProps) => {

    const { current } = props
    const cart = useSelector((state: IRedux) => state.order.cart)
    const dispatch = useDispatch()

    const handleChangeQuantityByButton = (item: ICart, type: string) => {
        if (type === 'plus') {
            if (item.quantity + 1 <= item.detail.quantity) {
                dispatch(doUpdateOrderAction({ _id: item._id, quantity: item.quantity + 1, detail: item.detail }))
            }
        } else if (type === 'minus') {
            if (item.quantity - 1 >= 1) {
                dispatch(doUpdateOrderAction({ _id: item._id, quantity: item.quantity - 1, detail: item.detail }))
            }
        }
    }

    const handleBlur = (value: number | string, item: ICart) => {
        if (value === '') {
            dispatch(doUpdateOrderAction({ quantity: 1, _id: item._id, detail: item.detail }))
        }
    }
    const handleChangeQuantityByInput = (value: number | string, item: ICart) => {
        if (value === '') {
            dispatch(doUpdateOrderAction({ quantity: -10, _id: item._id, detail: item.detail }))
        } else if (+value <= item.detail.quantity && +value >= 1) {
            dispatch(doUpdateOrderAction({ quantity: +value, _id: item._id, detail: item.detail }))
        } else if (+value < 1) {
            dispatch(doUpdateOrderAction({ quantity: 1, _id: item._id, detail: item.detail }))
        } else if (+value > +item.detail.quantity) {
            dispatch(doUpdateOrderAction({ quantity: +item.detail.quantity, _id: item._id, detail: item.detail }))
        }
    }

    const handleDeleteProduct = (item: ICart) => {
        dispatch(doDeleteOrderAction(item))
    }

    return (
        <div className="order-list">
            {cart?.map((item: ICart) => {
                return (
                    <div className="item">
                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.detail.thumbnail}`} />
                            <div style={{ marginLeft: "15px", width: '200px', wordWrap: 'break-word' }}>{item.detail.mainText}</div>
                        </div>

                        <div style={{ display: "flex", alignItems: 'center' }}>
                            <div className="price">
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.detail.price)}
                            </div>

                            <span className='right-side'>
                                <button onClick={() => { handleChangeQuantityByButton(item, 'minus') }} ><MinusOutlined /></button>
                                <input
                                    type="number"
                                    value={item.quantity != -10 ? item.quantity : ''}
                                    onChange={(event) => { handleChangeQuantityByInput(event.target.value, item) }}
                                    onBlur={(event) => { handleBlur(event.target.value, item) }}
                                />
                                <button onClick={() => { handleChangeQuantityByButton(item, 'plus') }}><PlusOutlined /></button>
                            </span>
                        </div>

                        <div className="total">
                            Sum: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.quantity * item.detail.price < 0 ? 0 : item.quantity * item.detail.price)}
                        </div>


                        <div hidden></div>
                        <div className="delete">
                            <DeleteOutlined
                                style={{ color: 'red' }}
                                onClick={() => { handleDeleteProduct(item) }} />
                        </div>

                    </div>
                )
            })}
        </div>
    )
}

export default Order