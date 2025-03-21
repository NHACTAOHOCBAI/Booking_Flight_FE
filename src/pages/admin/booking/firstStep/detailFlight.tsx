import { Card, Col, Divider, Row } from 'antd';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { PiAirplaneInFlightFill } from 'react-icons/pi';
import FlightSchedule from './flightSchedule';
import { TiPlaneOutline } from 'react-icons/ti';

const DetailFlight = () => (
    <Card
        title={<div><PiAirplaneInFlightFill style={{ width: 20, height: 20, verticalAlign: "middle", marginBottom: 4 }} /> Detail flight</div>}
        headStyle={{ textAlign: "left" }}
        variant="borderless" style={{ width: "100%" }}>
        <Row>
            <Col span={11}>
                <div className='departure'>
                    <div >Tan Son Nhat Airport</div>
                    <div >5:30 21/3/2025</div>
                </div>
            </Col>
            <Col span={2} >
                <MdOutlineDoubleArrow style={{ width: 20, height: 20, marginTop: 20 }} />
            </Col>
            <Col span={11}>
                <div className='departure'>
                    <div>Noi Bay Airport</div>
                    <div >16:00 21/3/2025</div>
                </div>
            </Col>
        </Row>
        <Divider />
        <FlightSchedule />
    </Card>
);

export default DetailFlight;