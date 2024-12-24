import { Outlet } from "react-router-dom"
import AppFooter from "@/components/layout/client/footer/app.footer"
import AppHeader from "@/components/layout/client/header/app.header"

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