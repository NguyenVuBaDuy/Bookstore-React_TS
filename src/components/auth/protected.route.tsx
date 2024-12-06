import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useSelector } from "react-redux"

interface IRedux {
    account: {
        isAuthenticated: boolean;
        isLoadingApp: boolean;
        user: IDataUser;
    }
}

interface IProps {
    children: React.ReactNode;
}

const ProtectedRoute = (props: IProps) => {

    const isAdminRoute = window.location.pathname.startsWith('/admin')
    const role = useSelector((state: IRedux) => state.account.user.role)

    return (
        <>
            {(isAdminRoute === true && role === "ADMIN")
                || (!isAdminRoute && (role === 'USER' || role === 'ADMIN'))
                ?
                <>{props.children}</>
                :
                <Result
                    status="403"
                    title="403"
                    subTitle="Sorry, you are not authorized to access this page."
                    extra={<Button type="primary"><ArrowLeftOutlined />Go Back Home</Button>}
                />
            }
        </>
    )
}

export default ProtectedRoute