export { };

declare global {

    interface IRedux {
        account: {
            isAuthenticated: boolean;
            isLoadingApp: boolean;
            user: IDataUser;
        }
    }

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

    interface IUserTable {
        _id: string;
        fullName: string;
        email: string;
        phone: string;
        role: string;
        avatar: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }

    interface IImportUser {
        countSuccess: number;
        countError: number;
    }
}