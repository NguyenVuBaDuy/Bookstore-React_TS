import { DownOutlined, HomeOutlined, SearchOutlined, SmileOutlined } from "@ant-design/icons"
import { Avatar, Badge, Divider, Drawer, Dropdown, MenuProps, message, notification, Space } from "antd"
import { FaReact } from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import 'components/layout/client/header/app.header.scss'
import { useNavigate } from "react-router-dom"
import { logoutAPI } from 'services/api.service'
import { doLogoutAction } from 'redux/account/accountSlice'
const AppHeader = () => {

    const isAuthenticated = useSelector((state: IRedux) => state.account.isAuthenticated)

    const user = useSelector((state: IRedux) => state.account.user)
    const role = user.role

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        const res = await logoutAPI()
        if (res.data) {
            dispatch(doLogoutAction())
            message.success('Logout successfully!')
        } else notification.error({
            message: "Logout failed!",
            description: res.message
        })
    }

    const items: MenuProps['items'] = [
        ...(role === 'ADMIN' ? [{
            key: 'admin-dashboard',
            label: (
                <div
                    style={{ width: "100%" }}
                    onClick={() => { navigate('/admin') }}
                >Admin dashboard</div>
            )
        }] : [])
        ,
        {
            key: 'account-management',
            label: (
                <div>Account management</div>
            ),
        },
        {
            key: 'Logout',
            label: (
                <div
                    style={{ width: "100%" }}
                    onClick={() => { handleLogout() }}
                >Logout</div>
            ),
        },
    ];

    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle">☰</div>
                        <div className='page-header__logo'>
                            <span className='logo'>
                                <FaReact className='rotate icon-react' onClick={() => { navigate('/') }} />
                                <SearchOutlined className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="What are you looking for today?"
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item mobile hover">
                                <Space onClick={() => { navigate('/') }}>
                                    <HomeOutlined /> Home
                                </Space>
                            </li>
                            <li className="navigation__item mobile hover">
                                {!isAuthenticated ?
                                    <span onClick={() => { navigate('/login') }} > <SmileOutlined />  Account</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['hover']} placement="bottomRight">
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <Avatar size={35} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`} />{user.fullName}
                                                <DownOutlined />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>

                            <li className="navigation__item">
                                <Badge
                                    count={5}
                                    size={"small"}
                                    showZero
                                >
                                    <FiShoppingCart className='icon-cart' />
                                </Badge>

                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title={user.fullName}
                placement="left"
                onClose={() => { }}
                open={false}
            >
                <p>Account management</p>
                <Divider />

                <p>Logout</p>
                <Divider />
            </Drawer>
        </>
    )
}

export default AppHeader