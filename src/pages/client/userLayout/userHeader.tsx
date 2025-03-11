import { Link } from "react-router-dom"
import "./headerStyle.css"
import { Button } from "antd"
const UserHeader = () => {
    return (
        <div className="header">
            <div className="container">
                <Button className="item" type="link" style={{
                    color: "black"
                }}>
                    <Link to="/">Home</Link>
                </Button>
                <Button className="item" type="link" style={{
                    color: "black"
                }}>
                    <Link to="/about">About us</Link>
                </Button>
                <Button className="item" type="link" style={{
                    color: "black"
                }}>
                    <Link to="/booking">Booking</Link>
                </Button>
                <Button className="item" type="link" style={{
                    color: "black"
                }}>
                    <Link to="/login">Log in</Link>
                </Button>
                <Button className="item" type="link" style={{
                    color: "black"
                }}>
                    <Link to="/logout">Log out</Link>
                </Button>

            </div>
        </div>
    )
}
export default UserHeader