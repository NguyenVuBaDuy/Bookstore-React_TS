import { Outlet } from "react-router-dom"
import AppFooter from "@/components/layout/client/app.footer"
import AppHeader from "@/components/layout/client/app.header"

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