import { Outlet } from "react-router-dom"
import AppFooter from "./app.footer"
import AppHeader from "./app.header"

const AppLayout = () => {
    return (
        <div className="layout">
            <AppHeader />
            <Outlet />
            <AppFooter />
        </div>
    )
}

export default AppLayout