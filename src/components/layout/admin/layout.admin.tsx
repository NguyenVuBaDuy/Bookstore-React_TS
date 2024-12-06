import { DollarOutlined, DownOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined, WindowsOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Menu, message, notification, Space, theme } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { logoutAPI } from "services/api.service";
import { doLogoutAction } from "redux/account/accountSlice";

interface IItems {
    key: string;
    icon?: React.ReactNode;
    label: React.ReactNode;
}

const LayoutAdmin = () => {

    const [collapsed, setCollapsed] = useState(false);
    const user = useSelector((state: IRedux) => state.account.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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

    const items: IItems[] = [
        {
            key: '/admin',
            icon: <WindowsOutlined />,
            label: <Link to={'/admin'}>Dashboard</Link>,
        },
        {
            key: '/admin/user',
            icon: <UserOutlined />,
            label: <Link to={'/admin/user'}>Manage User</Link>,
        },
        {
            key: '/admin/book',
            icon: <FaBook />,
            label: <Link to={'/admin/book'}>Manage Book</Link>,
        },
        {
            key: '/admin/order',
            icon: <DollarOutlined />,
            label: <Link to={'/admin/order'}>Manage Order</Link>,
        }
    ]

    const itemsAccount: IItems[] = [
        {
            key: 'account-management',
            label: <div style={{ width: "100%" }}>
                <label style={{ cursor: "pointer" }}>Account management</label>
            </div>,
        },
        {
            key: 'homepage',
            label: <div style={{ width: "100%" }} onClick={() => { navigate('/') }}>
                <label style={{ cursor: "pointer" }}>Home page</label>
            </div>,
        },
        {
            key: 'logout',
            label: <div style={{ width: "100%" }} onClick={() => { handleLogout() }}>
                <label style={{ cursor: "pointer" }}>Logout</label>
            </div>,
        },
    ]

    return (
        <div>
            <Layout style={{ minHeight: '100vh', }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" style={{
                        color: "#61dafb",
                        margin: "15px 0",
                        textAlign: "center",
                        fontSize: !collapsed ? "32px" : "15px"
                    }}>
                        ADMIN
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['/admin']}
                        items={items}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <div style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => {
                                    setCollapsed(!collapsed)
                                }}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />

                            <Dropdown menu={{ items: itemsAccount }} trigger={['hover']} placement="bottomRight">
                                <a onClick={(e) => e.preventDefault()}>
                                    <Space style={{ marginRight: "15px" }}>
                                        <Avatar size='large' src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`} />{user.fullName}
                                        <DownOutlined />
                                    </Space>
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default LayoutAdmin