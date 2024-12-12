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

export const handleRefreshTokenAPI = () => {
    const urlBackend: string = '/api/v1/auth/refresh';
    return axios.get<IBackendRes<ILogin>>(urlBackend)
}

export const logoutAPI = () => {
    const urlBackend: string = '/api/v1/auth/logout'
    return axios.post<IBackendRes<string>>(urlBackend)
}

export const getUserAPI = (current: number, pageSize: number, query: string) => {
    const urlBackend: string = `/api/v1/user?current=${current}&pageSize=${pageSize}${query}`
    return axios.get<IBackendRes<IModelPaginate<IUserTable>>>(urlBackend)
}

export const createUserAPI = (fullName: string, email: string, password: string, phone: string) => {
    const urlBackend: string = '/api/v1/user'
    return axios.post<IBackendRes<IUserTable>>(urlBackend, { fullName, email, password, phone })
}

export const importUserAPI = (values: { fullName: string; email: string; phone: string; password: string; }[]) => {
    const urlBackend = '/api/v1/user/bulk-create'
    return axios.post<IBackendRes<IImportUser>>(urlBackend, values)
}

export const updateUserAPI = (_id: string, fullName: string, phone: string) => {
    const urlBackend = '/api/v1/user'
    return axios.put<IBackendRes<any>>(urlBackend, { _id, fullName, phone })
}

export const deleteUserAPI = (_id: string) => {
    const urlBackend = `/api/v1/user/${_id}`
    return axios.delete<IBackendRes<any>>(urlBackend)
}

export const getBookAPI = (current: number, pageSize: number, query: string) => {
    const urlBackend = `/api/v1/book?current=${current}&pageSize=${pageSize}${query}`
    return axios.get<IBackendRes<IModelPaginate<IBookTable>>>(urlBackend)
}

export const getCategoryAPI = () => {
    const urlBackend = '/api/v1/database/category'
    return axios.get<IBackendRes<TCategory>>(urlBackend)
}

export const handleUploadFile = (fileImg: any, type: string) => {
    const bodyFormData = new FormData();
    bodyFormData.append('fileImg', fileImg);
    return axios({
        method: 'post',
        url: '/api/v1/file/upload',
        data: bodyFormData,
        headers: {
            "Content-Type": "multipart/form-data",
            "upload-type": type
        },
    });
}

export const createBookAPI = (thumbnail: string, slider: string[], mainText: string, author: string, price: number, quantity: number, category: string) => {
    const urlBackend = '/api/v1/book'
    return axios.post<IBackendRes<IBookTable>>(urlBackend, { thumbnail, slider, mainText, author, price, quantity, category, sold: 0 })
}

export const updateBookAPI = (_id: string, thumbnail: string, slider: string[], mainText: string, author: string, price: number, quantity: number, category: string, sold: number) => {
    const urlBackend = `/api/v1/book/${_id}`
    return axios.put<IBackendRes<IBookTable>>(urlBackend, { thumbnail, slider, mainText, author, price, quantity, category, sold })
}

export const deleteBookAPI = (_id: string) => {
    const urlBackend = `/api/v1/book/${_id}`
    return axios.delete<IBackendRes<any>>(urlBackend)
}