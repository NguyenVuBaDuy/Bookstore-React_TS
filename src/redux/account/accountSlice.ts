import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDataAccount {
    id: string;
    email: string;
    phone: string;
    fullName: string;
    role: string;
    avatar: string;
}

interface IAccountState {
    isAuthenticated: boolean;
    user: IDataAccount;
}



const initialState: IAccountState = {
    isAuthenticated: false,
    user: {
        id: '',
        email: '',
        phone: '',
        fullName: '',
        role: '',
        avatar: '',
    }
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        doLoginAction: (state, action: PayloadAction<IDataAccount>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
    },
});

export const { doLoginAction } = accountSlice.actions;

export default accountSlice.reducer;
