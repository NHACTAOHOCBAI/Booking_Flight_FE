import { Card, Col, Divider, Row } from 'antd';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { PiAirplaneInFlightFill } from 'react-icons/pi';
import { toAirport } from '@/utils/convert';
import dayjs from 'dayjs';
import FlightSchedule from './flightSchedule/flightSchedule';
import { useAppSelector } from '@/redux/hooks';

const DetailFlight = () => {
    const bookingFlight = useAppSelector(state => state.bookingFlight)
    return (
        <Card
            title={<div><PiAirplaneInFlightFill style={{ width: 20, height: 20, verticalAlign: "middle", marginBottom: 4 }} /> Detail flight</div>}
            headStyle={{ textAlign: "left" }}
            variant="borderless" style={{ width: "100%" }}>
            <Row>
                <Col span={11}>
                    <div >{toAirport(bookingFlight.departureAirportId).airportName}</div>
                </Col>
                <Col span={2} >
                    <MdOutlineDoubleArrow style={{ width: 20, height: 20, marginTop: 20 }} />
                </Col>
                <Col span={11}>
                    <div >{toAirport(bookingFlight.arrivalAirportId).airportName}</div>
                </Col>
            </Row>
            <Row>
                <Col span={11}>
                    <div >{dayjs(bookingFlight.departureTime).format('HH:mm DD/MM/YYYY')}</div>
                </Col>
                <Col span={2} >
                </Col>
                <Col span={11}>
                    <div >{dayjs(bookingFlight.arrivalTime).format('HH:mm DD/MM/YYYY')}</div>
                </Col>
            </Row>
            <Divider />
            <FlightSchedule />
        </Card>
    )
}

export default DetailFlight;