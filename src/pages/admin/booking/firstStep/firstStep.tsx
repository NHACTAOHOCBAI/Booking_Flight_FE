import { Col, Row } from "antd"
import TicketInformation from "./ticketInformation/ticketInformation"
import DetailPrice from "./detailPrice/detailPrice"
import DetailFlight from "./detailFlight/detailFlight"

interface IProp {
    openNotification: () => void
}
const FirstStep = (prop: IProp) => {
    const { openNotification } = prop;
    return (
        <>
            <Row gutter={10} style={{ margin: 10 }}>
                <Col span={15}>
                    <Row>
                        <TicketInformation
                            openNotification={openNotification}
                        />
                    </Row>

                </Col>
                <Col span={9} style={{ display: "flex", gap: 10, flexDirection: "column" }}>
                    <DetailFlight />
                    <DetailPrice />
                </Col>
            </Row>
        </>
    )
}
export default FirstStep