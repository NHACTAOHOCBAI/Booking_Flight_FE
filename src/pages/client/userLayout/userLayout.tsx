import { Outlet } from "react-router-dom"
import UserHeader from "pages/client/userLayout/userHeader"
import UserFooter from "pages/client/userLayout/userFooter"
import "./layoutStyle.css"
import skyImage from "src/assets/background.png";
const UserLayout = () => {
    return (
        <>
            <div className="layout" style={{
                backgroundImage: `url(${skyImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: 700
            }} >
                <UserHeader />
                <Outlet />
            </div>
            <UserFooter />
        </>
    )
}
export default UserLayout