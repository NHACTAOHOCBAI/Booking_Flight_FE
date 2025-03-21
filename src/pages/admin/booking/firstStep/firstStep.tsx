import { Col, Row } from "antd"
import TicketInformation from "./ticketInformation"
import DetailPrice from "./detailPrice"
import DetailFlight from "./detailFlight"

const FirstStep = () => {
    return (
        <>
            <Row gutter={10} style={{ margin: 10 }}>
                <Col span={15}>
                    <TicketInformation />
                </Col>
                <Col span={9} style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <DetailPrice />
                    <DetailFlight />
                </Col>
            </Row>
        </>
    )
}
export default FirstStep