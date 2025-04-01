import { useState } from 'react'
import { Card, Select, Button, DatePicker } from 'antd'
import { IoIosSearch } from 'react-icons/io'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import dayjs from 'dayjs'

import SearchAddress from './SearchAddress'

const SearchFlightComponent = () => {
  const [departureValue, setDepartureValue] = useState('')
  const [arrivalValue, setArrivalValue] = useState('')
  const [departureTime, setDepartureTime] = useState('')
  const [arrivalTime, setArrivalTime] = useState('')
  const { RangePicker } = DatePicker

  const handleExchange = () => {
    const temp = departureValue
    setDepartureValue(arrivalValue)
    setArrivalValue(temp)
  }
  const handleSearch = () => {
    console.log(departureValue, arrivalValue, departureTime, arrivalTime)
  }
  return (
    <Card hoverable>
      <div style={{ height: 50, display: 'flex', flexDirection: 'row', gap: 10 }}>
        <Select
          defaultValue='oneDirection'
          options={[
            { value: 'oneDirection', label: 'One direction' },
            { value: 'twoDirection', label: 'Two direction' }
          ]}
        />
        <Select
          defaultValue='oneDirection'
          options={[
            { value: 'oneDirection', label: 'One direction' },
            { value: 'twoDirection', label: 'Two direction' }
          ]}
        />
      </div>
      <div style={{ width: 'auto', display: 'flex', flexDirection: 'row' }}>
        <div>
          <div className='flex gap-2'>
            <SearchAddress value={departureValue} setValue={setDepartureValue} placeholder='Nhập điểm khởi hành' />
            <FaArrowRightArrowLeft style={{ alignSelf: 'center', width: 50, height: 20 }} onClick={handleExchange} />
            <SearchAddress value={arrivalValue} setValue={setArrivalValue} placeholder='Nhập điểm đến' />
          </div>
        </div>
        <RangePicker
          onChange={(value) => {
            setDepartureTime(dayjs(value?.[0]).format('DD/MM/YYYY'))
            setArrivalTime(dayjs(value?.[1]).format('DD/MM/YYYY'))
          }}
          // onChange={(value) => console.log(value)}
          style={{ height: 50, marginLeft: 10, width: 350 }}
        />
        <Button
          icon={<IoIosSearch />}
          type='primary'
          className='bg-blue-600 '
          style={{ height: 50, marginLeft: 10, fontWeight: 400, fontSize: 16 }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
    </Card>
  )
}

export default SearchFlightComponent
