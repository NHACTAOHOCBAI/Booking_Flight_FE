import { Card, Col, Row } from "antd"
import { BsFillTicketPerforatedFill } from "react-icons/bs"

const Ticket = () => {
    return (
        <>
            <Card
                hoverable
                style={{
                    width: 950,
                    borderRadius: 15,
                    overflow: "hidden"
                }}
                bodyStyle={{ padding: 0 }}
                cover={<div style={{
                    backgroundColor: "#0984e3",
                    height: 60,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end"
                }}>
                    <div style={{ padding: 10, color: "white", fontWeight: "bold", fontSize: 18 }}>AIRLINE NAME</div>
                    <div style={{ padding: 10, paddingBottom: 0, color: "white", fontWeight: "bold", fontSize: 18 }}>BOARDING PASS <BsFillTicketPerforatedFill style={{ width: 40, height: 40, verticalAlign: "middle", marginBottom: 10 }} /></div>
                </div>}
            >
                <Row style={{ height: "auto" }}>
                    <Col span={14} style={{ margin: 15 }}>
                        <Row gutter={10} style={{ marginBottom: 20 }}>
                            <Col span={10}>
                                <div className="name" style={{ textAlign: "left" }}>
                                    <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                                        Passenger Name :
                                    </div>
                                    <div style={{ fontSize: 16 }}>
                                        NGUYEN DANG PHUC
                                    </div>
                                </div>
                            </Col>
                            <Col span={7}>
                                <div className="from" style={{ textAlign: "left" }}>
                                    <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                                        From :
                                    </div>
                                    <div style={{ fontSize: 16 }}>
                                        TP HO CHI MINH
                                    </div>
                                </div>
                            </Col>
                            <Col span={7}>
                                <div className="from" style={{ textAlign: "left" }}>
                                    <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                                        To :
                                    </div>
                                    <div style={{ fontSize: 16 }}>
                                        HA NOI
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={10} style={{ marginBottom: 20 }}>
                            <Col span={10}>
                                <div className="seat" style={{ textAlign: "left" }}>
                                    <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                                        Seat :
                                    </div>
                                    <div style={{ fontSize: 16 }}>
                                        ECONOMY CLASS
                                    </div>
                                </div>
                            </Col>
                            <Col span={14}>
                                <div className="time" style={{ textAlign: "left" }}>
                                    <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
                                        Boarding time :
                                    </div>
                                    <div style={{ fontSize: 16 }}>
                                        7:50 21/3/2025
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={1}>
                        <div style={{
                            height: "100%", // Độ cao của đường
                            width: "2px", // Độ dày của đường
                            borderLeft: "2px dashed #0984e3" // Đường nét đứt
                        }}></div>
                    </Col>
                    <Col span={7} style={{ display: "flex", flexDirection: "column", gap: 10, margin: 15 }}>
                        <Row>
                            <div className="name">
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ fontWeight: "bold" }}> Passenger Name : </span> Nguyen Dang Phuc
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="from">
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ fontWeight: "bold" }}> From : </span> TP Ho Chi Minh
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="to">
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ fontWeight: "bold" }}> To : </span> Ha Noi
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="seat">
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ fontWeight: "bold" }}> Seat : </span> Economy class
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <div className="boarding_time">
                                <div style={{ fontSize: 14 }}>
                                    <span style={{ fontWeight: "bold" }}> Boarding Time : </span> 5:10 21/3/2025
                                </div>
                            </div>
                        </Row>
                    </Col>

                </Row >
            </Card >
        </>
    )
}
export default Ticket