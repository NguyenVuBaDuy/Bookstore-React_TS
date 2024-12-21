import { useSelector } from "react-redux"

interface ICart {
    quantity: number;
    _id: string;
    detail: IBookTable
}

const Checkout = () => {

    const cart = useSelector((state: IRedux) => state.order.cart)

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
                                x{item.quantity}
                            </span>
                        </div>

                        <div className="total">
                            Sum: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.quantity * item.detail.price < 0 ? 0 : item.quantity * item.detail.price)}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}
export default Checkout