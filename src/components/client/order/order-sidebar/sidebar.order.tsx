import { Divider } from "antd"
import { useSelector } from "react-redux"

interface IProps {
    total: number;
    setCurrent: (v: number) => void
}

const SideBarOrder = (props: IProps) => {

    const { total, setCurrent } = props
    const cart = useSelector((state: IRedux) => state.order.cart)

    return (
        <div className="bill">
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
            <div className="button-buy" onClick={() => { setCurrent(1) }}>
                <button>Confirm ({cart?.length})</button>
            </div>
        </div>
    )
}

export default SideBarOrder