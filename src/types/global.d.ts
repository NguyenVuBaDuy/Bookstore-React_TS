export { };

declare global {

    interface IRedux {
        account: {
            isAuthenticated: boolean;
            isLoadingApp: boolean;
            user: IDataUser;
        },
        order: {
            cart: {
                quantity: number;
                _id: string;
                detail: IBookTable
            }[]
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

    interface IBookTable {
        _id: string;
        thumbnail: string;
        slider: string[];
        mainText: string;
        author: string;
        price: number;
        sold: number;
        quantity: number;
        category: string;
        createdAt: Date;
        updatedAt: Date;
        items?: IItems[];
    }

    type TCategory = string[]

    interface IItems {
        original: string;
        thumbnail: string;
        originalClass: string;
        thumbnailClass: string;
    }
}