import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message } from 'antd';

interface ICart {
    quantity: number;
    _id: string;
    detail: IBookTable
}

interface IDataOrder {
    cart: ICart[]
}

const initialState: IDataOrder = {
    cart: []
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        doAddToCartAction: (state, action: PayloadAction<ICart>) => {
            let newCart = state.cart
            const index: number = newCart.findIndex((item: ICart) => item._id === action.payload._id)
            if (index > -1) {
                newCart[index].quantity = +newCart[index].quantity + action.payload.quantity
            } else {
                newCart = [action.payload, ...newCart]
            }
            state.cart = newCart
            message.success('The product has been added to the cart!')
        }
    },
});

export const { doAddToCartAction } = orderSlice.actions;

export default orderSlice.reducer;
