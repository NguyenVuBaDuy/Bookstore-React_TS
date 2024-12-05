import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface IAccountState {
    isAuthenticated: boolean;
    user: IDataUser;
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
        doLoginAction: (state, action: PayloadAction<IDataUser>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        doGetAccountAction: (state, action: PayloadAction<IDataUser>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
    },
});

export const { doLoginAction, doGetAccountAction } = accountSlice.actions;

export default accountSlice.reducer;
