import { useAppSelector } from "@/redux/hooks";
import { Col, Row } from "antd";
import { TiPlaneOutline } from "react-icons/ti";
import InterAirport from "./interAirport";
import { toAirport } from "@/utils/convert";
import dayjs from "dayjs";
import DesAirport from "./desAirport";

const FlightSchedule = () => {
    const bookingFlight = useAppSelector(state => state.bookingFlight)
    return (
        <>
            <Col>
                {/* start */}
                <Row>
                    <Col span={11}>
                        <div className="time">{dayjs(bookingFlight.departureTime).format('HH:mm DD/MM/YYYY')}</div>
                    </Col>
                    <Col span={2} >
                        <TiPlaneOutline style={{ width: 20, height: 20, transform: "rotate(180deg)" }} />
                    </Col>
                    <Col span={11}>
                        <div className="airport">{toAirport(bookingFlight.departureAirportId).airportName}</div>
                    </Col>
                </Row>
                {/* start */}
                {/* inter */}
                {
                    bookingFlight.interAirport.map((value, index) => {
                        const startTime = index === 0
                            ? bookingFlight.departureTime
                            : bookingFlight.interAirport[index - 1].departureTime;
                        return (
                            <InterAirport
                                depatureTime={value.departureTime}
                                airportId={value.airportId}
                                startTime={startTime}
                                arrivalTime={value.arrivalTime}
                                note={value.note}
                            />
                        )
                    })
                }
                {/* inter */}
                {/* end */}
                <DesAirport
                    airportId={bookingFlight.arrivalAirportId}
                    startTime={
                        bookingFlight.interAirport.length === 0
                            ? bookingFlight.departureTime
                            : bookingFlight.interAirport[bookingFlight.interAirport.length - 1].departureTime
                    }
                    arrivalTime={bookingFlight.arrivalTime}
                    note="nothing"
                />
                {/* end */}
            </Col>
        </>
    )
}
export default FlightSchedule;