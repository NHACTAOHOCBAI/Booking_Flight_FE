import { Col, Row } from "antd";
import { SlLocationPin } from "react-icons/sl";
import { TiPlaneOutline } from "react-icons/ti";

const FlightSchedule = () => {
    return (
        <>
            <Col>
                <Row>
                    <Col span={11}>
                        <div className="time">5:30 21/3/2025</div>
                    </Col>
                    <Col span={2} >
                        <TiPlaneOutline style={{ width: 20, height: 20, transform: "rotate(180deg)" }} />
                    </Col>
                    <Col span={11}>
                        <div className="airport">Tan Son Nhat Airport</div>
                    </Col>
                </Row>
                <Row style={{ marginBottom: 10 }}>
                    <Col span={11}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                            <div className="time">2h10m</div>
                        </div>
                    </Col>
                    <Col span={2}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <div style={{ width: 1.5, background: "#74b9ff", height: 100 }}></div>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col span={11}>
                        <div className="time">16:00 21/3/2025</div>
                    </Col>
                    <Col span={2} >
                        <SlLocationPin style={{ width: 20, height: 20 }} />
                    </Col>
                    <Col span={11}>
                        <div className="airport">Noi Bay Airport</div>
                    </Col>
                </Row>
            </Col>
        </>
    )
}
export default FlightSchedule;