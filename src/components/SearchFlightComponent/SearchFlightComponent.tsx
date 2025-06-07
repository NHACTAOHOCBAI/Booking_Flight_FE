import { DownOutlined, SearchOutlined, UpOutlined, UserOutlined } from '@ant-design/icons'
import { Button, DatePicker, Radio, Space, Typography, message } from 'antd'
import type { RadioChangeEvent } from 'antd'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'

import SearchAddress from './SearchAddress'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '@/utils/utils'

const { Text } = Typography

interface PassengerCounterProps {
  label: string
  count: number
  onIncrement: () => void
  onDecrement: () => void
  min?: number
  max?: number
}

const PassengerCounter: React.FC<PassengerCounterProps> = ({
  label,
  count,
  onIncrement,
  onDecrement,
  min = 0,
  max = 9
}) => (
  <div className='flex items-center justify-between py-2'>
    <Text className='text-gray-700 text-[1rem]'>{label}</Text>
    <Space>
      <Button
        onClick={onDecrement}
        disabled={count <= min}
        shape='circle'
        icon={<DownOutlined style={{ fontSize: '14px' }} />}
        className='bg-red-100 text-red-600 border-red-100 hover:bg-red-200 hover:border-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200'
        size='small'
      />
      <Text className='w-5 text-center text-gray-800 font-medium text-sm'>{count}</Text>
      <Button
        onClick={onIncrement}
        disabled={count >= max}
        shape='circle'
        icon={<UpOutlined style={{ fontSize: '14px' }} />}
        className='bg-red-100 text-red-600 border-red-100 hover:bg-red-200 hover:border-red-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200'
        size='small'
      />
    </Space>
  </div>
)

const MAX_ADULTS = 9 // Max number of adults allowed

const SearchFlightComponent: React.FC = () => {
  const [tripType, setTripType] = useState<string>('round-trip')
  const [departureValue, setDepartureValue] = useState<string>('')
  const [arrivalValue, setArrivalValue] = useState<string>('')
  const [departureDate, setDepartureDate] = useState<Dayjs | null>(null)
  const [returnDate, setReturnDate] = useState<Dayjs | null>(null)

  const [adults, setAdults] = useState<number>(1) // Only adults, default to 1
  // const [showPassengerSelector, setShowPassengerSelector] = useState<boolean>(false)

  const handleExchange = (): void => {
    const temp = departureValue
    setDepartureValue(arrivalValue)
    setArrivalValue(temp)
  }

  const handleAdultsChange = (operation: 'increment' | 'decrement'): void => {
    setAdults((prevAdults) => {
      let newCount = prevAdults
      if (operation === 'increment') {
        newCount = Math.min(prevAdults + 1, MAX_ADULTS)
      } else {
        newCount = Math.max(prevAdults - 1, 1) // Minimum 1 adult
      }
      return newCount
    })
  }

  const navigate = useNavigate()

  const handleSearch = (): void => {
    if (!departureValue || !arrivalValue) {
      message.error('Please fill in Origin and Destination.')
      return
    }
    if (!departureDate) {
      message.error('Please select a Departure Date.')
      return
    }
    if (tripType === 'round-trip' && !returnDate) {
      message.error('Please select a Return Date for round trips.')
      return
    }
    if (departureDate && returnDate && departureDate.isAfter(returnDate, 'day') && tripType === 'round-trip') {
      message.error('Return date must be on or after the departure date.')
      return
    }
    if (adults === 0) {
      message.error('Please select at least one adult.')
      return
    }

    console.log('Searching flights with:', {
      tripType,
      departureValue,
      arrivalValue,
      departureDate: departureDate?.format('YYYY-MM-DD'),
      returnDate: returnDate?.format('YYYY-MM-DD')
    })
    message.success('Search criteria submitted!')

    navigate({
      pathname: path.booking,
      search: createSearchParams({
        tripType,
        'departureAirport.city.cityName': departureValue,
        'arrivalAirport.city.cityName': arrivalValue,
        departureTime: departureDate?.format('YYYY-MM-DD'),
        returnTime: returnDate?.format('YYYY-MM-DD') || '',
        passengerNumber: adults.toString()
      }).toString()
    })
    // else
    //   navigate({
    //     pathname: path.booking,
    //     search: createSearchParams({
    //       ...queryConfig,
    //       'departureAirport.city.cityName': departureValue,
    //       'arrivalAirport.city.cityName': arrivalValue,
    //       departureTime: departureDate?.format('YYYY-MM-DD')
    //     }).toString()
    // })
  }

  useEffect(() => {
    if (tripType === 'one-way') {
      setReturnDate(null)
    }
  }, [tripType])

  return (
    <div className='bg-white w-full max-w-3xl mx-auto rounded-lg shadow-lg'>
      <div className='p-4 sm:p-6 md:p-8 space-y-6'>
        <Radio.Group
          onChange={(e: RadioChangeEvent) => setTripType(e.target.value)}
          value={tripType}
          className='flex items-center space-x-4'
        >
          <Radio value='round-trip'>Round Trip</Radio>
          <Radio value='one-way'>One Way</Radio>
        </Radio.Group>

        <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-2'>
          <div className='w-full sm:flex-1'>
            <SearchAddress value={departureValue} setValue={setDepartureValue} placeholder='Origin (City or Airport)' />
          </div>
          <button
            onClick={handleExchange}
            className='p-2 rounded-full hover:bg-gray-100 transition-colors'
            aria-label='Swap origin and destination'
          >
            <FaArrowRightArrowLeft className='text-xl text-red-500 hover:text-red-700 transition-colors' />
          </button>
          <div className='w-full sm:flex-1'>
            <SearchAddress
              value={arrivalValue}
              setValue={setArrivalValue}
              placeholder='Destination (City or Airport)'
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <DatePicker
            size='large'
            placeholder='Departure Date'
            className='w-full'
            format='DD MMM, YYYY'
            value={departureDate}
            onChange={(dateVal: Dayjs | null) => setDepartureDate(dateVal)}
            disabledDate={(current) => current && current < dayjs().startOf('day')}
          />

          <DatePicker
            size='large'
            placeholder='Return Date'
            className='w-full'
            format='DD MMM, YYYY'
            value={returnDate}
            onChange={(dateVal: Dayjs | null) => setReturnDate(dateVal)}
            disabled={tripType === 'one-way'}
            disabledDate={(current) => {
              const isBeforeToday = current.isBefore(dayjs().startOf('day'))

              const isBeforeDeparture = departureDate ? current.isBefore(departureDate.add(0, 'day'), 'day') : false

              return isBeforeToday || isBeforeDeparture
            }}
          />
        </div>

        <div className='relative'>
          {/* <Button
            size='large'
            onClick={() => setShowPassengerSelector(!showPassengerSelector)}
            className='w-full flex items-center justify-between text-left h-auto py-2.5'
            icon={<UserOutlined className='text-red-500 text-lg' />}
          >
            <span className='text-gray-700'>
              {adults} Person{adults > 1 ? 's' : ''}
            </span>
            {showPassengerSelector ? (
              <UpOutlined className='text-gray-500 text-base' />
            ) : (
              <DownOutlined className='text-gray-500 text-base' />
            )}
          </Button> */}
          <PassengerCounter
            label='Persons'
            count={adults}
            onIncrement={() => handleAdultsChange('increment')}
            onDecrement={() => handleAdultsChange('decrement')}
            min={1} // Minimum 1 adult
            max={MAX_ADULTS} // Max adults
          />
        </div>

        <div className='pt-2'>
          <Button
            onClick={handleSearch}
            type='primary'
            size='large'
            icon={<SearchOutlined style={{ fontSize: '18px' }} />}
            className='w-full !bg-red-600 hover:!bg-red-700 !text-white !font-semibold !py-0 !px-6 !rounded-md !shadow-md hover:!shadow-lg !transition-all !duration-150 !transform hover:!scale-[1.02] flex items-center justify-center space-x-2'
            style={{ height: '48px' }}
          >
            Search Flights
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SearchFlightComponent
