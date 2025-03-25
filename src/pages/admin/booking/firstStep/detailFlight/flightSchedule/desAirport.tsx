import { toAirport } from "@/utils/convert"
import { Col, Row } from "antd"
import dayjs from "dayjs"
import { IoLocationOutline } from "react-icons/io5"

interface IProp {
    airportId: string
    startTime: string
    arrivalTime: string
    note: string
}
function getTimeDifference(arrivalTime: string, departureTime: string): string {
    // Chuyển đổi chuỗi ISO 8601 thành timestamp (milliseconds) để tránh lỗi múi giờ
    const arrival = Date.parse(arrivalTime);
    const departure = Date.parse(departureTime);

    // Tính khoảng cách thời gian (milliseconds)
    const diffMs = departure - arrival;

    // Chuyển đổi thành phút
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    // Tính số giờ và phút
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Định dạng kết quả
    return `${hours}h${minutes}m`;
}

const DesAirport = (prop: IProp) => {
    const { airportId, startTime, arrivalTime } = prop;
    return (
        <>
            <Row style={{ marginBottom: 10 }}>
                <Col span={11}>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <div className="time">{getTimeDifference(startTime, arrivalTime)}</div>
                    </div>
                </Col>
                <Col span={2}>
                    <Row justify="center">
                        <div
                            style={{
                                height: 100, // Độ cao của đường
                                borderLeft: '2px dashed black' // Đường nét đứt
                            }}
                        ></div>
                    </Row>
                </Col>
            </Row>
            <Row >
                <Col span={11}>
                    <div className="time">{dayjs(arrivalTime).format('HH:mm DD/MM/YYYY')}</div>
                </Col>
                <Col span={2} >
                    <IoLocationOutline style={{ width: 20, height: 20, marginTop: 5 }} />
                </Col>
                <Col span={11}>
                    <div className="airport">{toAirport(airportId).airportName}</div>
                </Col>
            </Row>
        </>
    )
}
export default DesAirport;