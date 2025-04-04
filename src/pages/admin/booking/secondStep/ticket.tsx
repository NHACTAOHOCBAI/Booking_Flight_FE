import { useAppSelector } from '@/redux/hooks'
import { toAirport, toCity, toSeat } from '@/utils/convert'
import { Card, Col, Row } from 'antd'
import dayjs from 'dayjs'
import { BsFillTicketPerforatedFill } from 'react-icons/bs'

const Ticket = () => {
  const bookingTicketsList = useAppSelector(state => state.bookingTicketsList)
  const bookingFlight = useAppSelector(state => state.bookingFlight)
  return (
    <div style={{ display: 'flex', flexDirection: "column", gap: 10 }}>
      {
        bookingTicketsList.map((value) => (
          <Card
            hoverable
            style={{
              width: 950,
              borderRadius: 15,
              overflow: 'hidden'
            }}
            bodyStyle={{ padding: 0 }}
            cover={
              <div
                style={{
                  backgroundColor: '#0984e3',
                  height: 60,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end'
                }}
              >
                <div style={{ padding: 10, color: 'white', fontWeight: 'bold', fontSize: 18 }}>AIRLINE NAME</div>
                <div
                  style={{
                    padding: 10,
                    paddingBottom: 0,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  BOARDING PASS
                  <BsFillTicketPerforatedFill style={{ width: 40, height: 40, verticalAlign: 'middle', marginLeft: 10, marginBottom: 5 }} />
                </div>
              </div>
            }
          >
            <Row style={{ height: 'auto' }}>
              <Col span={14} style={{ margin: 15 }}>
                <Row gutter={10} style={{ marginBottom: 20 }}>
                  <Col span={10}>
                    <div className='name' style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Passenger Name :</div>
                      <div style={{ fontSize: 16 }}>{value.passengerName}</div>
                    </div>
                  </Col>
                  <Col span={7}>
                    <div className='from' style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>From :</div>
                      <div style={{ fontSize: 16 }}>{toCity(toAirport(bookingFlight.departureAirportId).cityId as string).cityName}</div>
                    </div>
                  </Col>
                  <Col span={7}>
                    <div className='from' style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>To :</div>
                      <div style={{ fontSize: 16 }}>{toCity(toAirport(bookingFlight.arrivalAirportId).cityId as string).cityName}</div>
                    </div>
                  </Col>
                </Row>
                <Row gutter={10} style={{ marginBottom: 20 }}>
                  <Col span={8}>
                    <div className='seat' style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Seat :</div>
                      <div style={{ fontSize: 16 }}>{toSeat(value.seatId).seatName}</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className='time' style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Boarding Time :</div>
                      <div style={{ fontSize: 16 }}>{dayjs(bookingFlight.departureTime).format('HH:mm DD/MM/YYYY')}</div>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className='time' style={{ textAlign: 'left' }}>
                      <div style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>Flight Code :</div>
                      <div style={{ fontSize: 16 }}>{bookingFlight.flightCode}</div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col span={1}>
                <div
                  style={{
                    height: '100%', // Độ cao của đường
                    width: '2px', // Độ dày của đường
                    borderLeft: '2px dashed #0984e3' // Đường nét đứt
                  }}
                ></div>
              </Col>
              <Col span={7} style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: 15 }}>
                <Row>
                  <div className='name'>
                    <div style={{ fontSize: 14 }}>
                      <span style={{ fontWeight: 'bold' }}> Passenger Name : </span>{value.passengerName}
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className='from'>
                    <div style={{ fontSize: 14 }}>
                      <span style={{ fontWeight: 'bold' }}> From : </span> {toCity(toAirport(bookingFlight.departureAirportId).cityId as string).cityName}
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className='to'>
                    <div style={{ fontSize: 14 }}>
                      <span style={{ fontWeight: 'bold' }}> To : </span> {toCity(toAirport(bookingFlight.arrivalAirportId).cityId as string).cityName}
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className='seat'>
                    <div style={{ fontSize: 14 }}>
                      <span style={{ fontWeight: 'bold' }}> Seat : </span>{toSeat(value.seatId).seatName}
                    </div>
                  </div>
                </Row>
                <Row>
                  <div className='boarding_time'>
                    <div style={{ fontSize: 14 }}>
                      <span style={{ fontWeight: 'bold' }}> Boarding Time : </span> {dayjs(bookingFlight.departureTime).format('HH:mm DD/MM/YYYY')}
                    </div>
                  </div>
                </Row>
              </Col>
            </Row>
          </Card>
        ))
      }
    </div>
  )
}
export default Ticket

