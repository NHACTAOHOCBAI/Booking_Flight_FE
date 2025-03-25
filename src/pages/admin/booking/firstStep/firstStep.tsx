import { Button, Col, Row } from "antd"
import TicketInformation from "./ticketInformation/ticketInformation"
import DetailPrice from "./detailPrice/detailPrice"
import DetailFlight from "./detailFlight/detailFlight"


interface IProp {
    tickets: ITicketTable,
    setTickets: (value: ITicketTable) => void
}
const FirstStep = (props: IProp) => {
    const { tickets, setTickets } = props;
    return (
        <>
            <Row gutter={10} style={{ margin: 10 }}>
                <Col span={15}>
                    <Row justify="end">
                        <Button style={{ margin: 10 }}>New Ticket</Button>
                    </Row>
                    <Row>
                        <TicketInformation
                            tickets={tickets}
                            setTickets={setTickets}
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