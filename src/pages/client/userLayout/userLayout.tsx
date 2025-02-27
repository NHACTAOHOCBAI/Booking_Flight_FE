import { Outlet } from "react-router-dom"
import UserHeader from "pages/client/userLayout/userHeader"
import UserFooter from "pages/client/userLayout/userFooter"

const UserLayout = () => {
    return (
        <>
            <UserHeader />
            <Outlet />
            <UserFooter />
        </>
    )
}
export default UserLayout