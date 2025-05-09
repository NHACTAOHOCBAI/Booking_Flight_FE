import { toAirport } from '@/utils/convert'
import { Col, Row } from 'antd'
import dayjs from 'dayjs'
import { GrMapLocation } from 'react-icons/gr'

interface IProp {
  airportId: string
  startTime: string
  arrivalTime: string
  depatureTime: string
  note: string
}
function getTimeDifference(arrivalTime: string, departureTime: string): string {
  // Chuyển đổi chuỗi ISO 8601 thành timestamp (milliseconds) để tránh lỗi múi giờ
  const arrival = Date.parse(arrivalTime)
  const departure = Date.parse(departureTime)

  // Tính khoảng cách thời gian (milliseconds)
  const diffMs = departure - arrival

  // Chuyển đổi thành phút
  const totalMinutes = Math.floor(diffMs / (1000 * 60))

  // Tính số giờ và phút
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  // Định dạng kết quả
  return `${hours}h${minutes}m`
}

const intermediateAirports = (prop: IProp) => {
  const { airportId, startTime, arrivalTime, depatureTime } = prop
  return (
    <>
      <Row style={{ marginBottom: 10 }}>
        <Col span={11}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div className='time'>{getTimeDifference(startTime, arrivalTime)} </div>
          </div>
        </Col>
        <Col span={2}>
          <Row justify='center'>
            <div
              style={{
                height: 100, // Độ cao của đường
                borderLeft: '2px dashed black' // Đường nét đứt
              }}
            ></div>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={11}>
          <Row justify='center'>
            <div className='time'>{dayjs(arrivalTime).format('HH:mm DD/MM/YYYY')}</div>
          </Row>
          <Row>
            <div style={{ height: 15 }}></div>
          </Row>
          <Row justify='center'>
            <div className='time'>{dayjs(depatureTime).format('HH:mm DD/MM/YYYY')}</div>
          </Row>
        </Col>
        <Col span={2}>
          <GrMapLocation style={{ width: 20, height: 20, marginTop: 20 }} />
        </Col>
        <Col span={11}>
          <div className='airport'>{toAirport(airportId).airportName}</div>
        </Col>
      </Row>
    </>
  )
}
export default intermediateAirports
