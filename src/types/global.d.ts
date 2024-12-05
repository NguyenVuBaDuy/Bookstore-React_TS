export { };

declare global {

    interface IDataUser {
        email: string;
        phone: string;
        fullName: string;
        role: string;
        avatar: string;
        id: string;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    interface IRegister {
        _id: string;
        email: string;
        fullName: string
    }

    interface ILogin {
        access_token: string;
        user: IDataUser
    }

    interface IFetchAccount {
        user: IDataUser
    }
}