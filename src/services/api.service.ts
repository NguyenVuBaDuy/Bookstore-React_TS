import axios from 'services/axios.customize'


export const registerAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend: string = '/api/v1/user/register'
    return axios.post<IBackendRes<IRegister>>(urlBackend, { fullName, email, password, phone })
}