import { useAppSelector } from '@/redux/hooks'
import { Col, Row } from 'antd'
import { TiPlaneOutline } from 'react-icons/ti'
import InterAirport from './interAirport'
import dayjs from 'dayjs'
import DesAirport from './desAirport'

const FlightSchedule = () => {
  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  return (
    <>
      <Col>
        {/* start */}
        <Row>
          <Col span={11}>
            <div className='time'>{dayjs(bookingFlight.departureTime).format('HH:mm DD/MM/YYYY')}</div>
          </Col>
          <Col span={2}>
            <TiPlaneOutline style={{ width: 20, height: 20, transform: 'rotate(180deg)' }} />
          </Col>
          <Col span={11}>
            <div className='airport'>{bookingFlight.arrivalAirportName}</div>
          </Col>
        </Row>
        {/* start */}
        {/* inter */}
        {bookingFlight.listFlight_Airport &&
          bookingFlight.listFlight_Airport.map((value, index) => {
            const startTime =
              index === 0 ? bookingFlight.departureTime : bookingFlight.listFlight_Airport[index - 1].departureTime
            return (
              <InterAirport
                key={index}
                depatureTime={value.departureTime}
                airportId={value.airportName as string}
                startTime={startTime}
                arrivalTime={value.arrivalTime}
                note={value.note}
              />
            )
          })}
        {/* inter */}
        {/* end */}
        <DesAirport
          airportId={bookingFlight.arrivalAirportId as string}
          startTime={
            bookingFlight.listFlight_Airport &&
            (bookingFlight.listFlight_Airport.length === 0
              ? bookingFlight.departureTime
              : bookingFlight.listFlight_Airport[bookingFlight.listFlight_Airport.length - 1].departureTime)
          }
          arrivalTime={bookingFlight.arrivalTime}
          note='nothing'
        />
        {/* end */}
      </Col>
    </>
  )
}
export default FlightSchedule
