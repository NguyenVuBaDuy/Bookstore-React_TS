import axios from 'services/axios.customize'


export const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend: string = '/api/v1/user/register'
    return axios.post<IBackendRes<IRegister>>(urlBackend, { fullName, email, password, phone })
}

export const loginAPI = (email: string, password: string, delay: number = 1000) => {
    const urlBackend: string = '/api/v1/auth/login'
    return axios.post<IBackendRes<ILogin>>(urlBackend, { username: email, password, delay })
}

export const fetchAccount = () => {
    const urlBackend: string = '/api/v1/auth/account'
    return axios.get<IBackendRes<IFetchAccount>>(urlBackend)
}