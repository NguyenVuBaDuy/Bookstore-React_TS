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
        doLogoutAction: (state) => {
            state.isAuthenticated = false
            state.user = initialState.user
            localStorage.removeItem('access_token')
        }
    },
});

export const { doLoginAction, doGetAccountAction, doLogoutAction } = accountSlice.actions;

export default accountSlice.reducer;
