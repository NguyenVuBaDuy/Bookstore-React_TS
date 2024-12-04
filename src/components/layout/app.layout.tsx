import { Outlet } from "react-router-dom"
import AppFooter from "components/layout/app.footer"
import AppHeader from "components/layout/app.header"

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