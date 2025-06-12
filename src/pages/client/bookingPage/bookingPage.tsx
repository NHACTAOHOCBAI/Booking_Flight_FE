import flightApi from '@/apis/apis/flight.api'
import useQueryConfig, { QueryConfig } from '@/hooks/useQueryConfig'
import { setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice'
import { useAppDispatch } from '@/redux/hooks'
import { getTimeDifference } from '@/utils/utils'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleOutlined,
  RocketOutlined,
  SearchOutlined,
  TagOutlined
} from '@ant-design/icons'
import { useQuery } from '@tanstack/react-query'
import { Button, Typography, message } from 'antd'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const { Text, Title } = Typography

interface FlightCardProps {
  flight: IFlightTable
  onSelectSeat: (flightId: string, seat: ISeat) => void
  isSelected: boolean
}

interface QueryParamsSearch {
  departureCityName: string
  arrivalCityName: string
  departureTime: string
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onSelectSeat, isSelected }) => {
  const [selectedSeatDetails, setSelectedSeatDetails] = useState<ISeat | null>(null)

  useEffect(() => {
    if (!isSelected) {
      setSelectedSeatDetails(null)
    }
  }, [isSelected])

  const duration = getTimeDifference(flight.departureTime, flight.arrivalTime)

  return (
    <div
      className={`bg-white rounded-lg shadow-lg overflow-hidden mb-6 transition-all duration-300 ${isSelected ? 'border-2 border-red-500' : 'hover:shadow-xl'}`}
    >
      <div className='p-4 md:p-6 bg-gray-50 border-b border-gray-200'>
        <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
          <div className='flex items-center mb-2 sm:mb-0'>
            <img
              src={`https://placehold.co/40x40/FF0000/FFFFFF?text=${flight.flightCode.substring(0, 2)}`}
              alt={`${flight.flightCode} logo`}
              className='w-10 h-10 mr-3 rounded-full'
            />
            <div>
              <Title level={3} className='!text-lg !font-semibold !text-red-600'>
                {flight.flightCode}
              </Title>
              <Text type='secondary' className='!text-xs'>
                Direct
              </Text>
            </div>
          </div>
          <Text type='secondary' className='!text-sm'>
            Duration: {duration}
          </Text>
        </div>
      </div>

      <div className='p-4 md:p-6'>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4'>
          <div className='text-center md:text-left'>
            <Title level={2} className='!text-2xl !font-bold !text-gray-800'>
              {flight.departureTime}
            </Title>
            <Text className='!text-sm !text-gray-600'>{flight.departureAirportName?.split('_')[0] || 'N/A'}</Text>
            {/* <Text type='secondary' className='!text-xs'>
              {flight.departureAirportName}
            </Text> */}
          </div>
          <div className='w-full md:w-auto flex justify-center items-center'>
            <RocketOutlined style={{ fontSize: '24px' }} className='text-red-500  hidden md:block' />
            <div className='md:hidden w-full border-t border-dashed border-gray-300 my-2'></div>
          </div>
          <div className='text-center md:text-left'>
            <Title level={2} className='!text-2xl !font-bold !text-gray-800'>
              {flight.arrivalTime}
            </Title>
            <Text className='!text-sm !text-gray-600'>{flight.arrivalAirportName?.split('_')[0] || 'N/A'}</Text>
            {/* <Text type='secondary' className='!text-xs'>
              {flight.arrivalAirportName}
            </Text> */}
          </div>
        </div>
      </div>

      <div className='px-4 md:px-6 pb-4 md:pb-6'>
        <Title level={4} className='!text-md !font-semibold !text-gray-700 !mb-3'>
          Choose your seat:
        </Title>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {flight.listFlight_Seat.map((seat: ISeat) => (
            <span
              key={seat.seatId}
              onClick={() => {
                setSelectedSeatDetails(seat)
                onSelectSeat(flight.id as string, seat)
              }}
              className={`cursor-pointer p-4 border rounded-lg text-left transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 h-auto
                                ${selectedSeatDetails?.seatId === seat.seatId ? 'bg-red-50 border-red-500 ring-2 ring-red-500' : 'bg-gray-50 border-gray-200 hover:border-red-300'}`}
            >
              <div className='flex items-center mb-1'>
                <TagOutlined style={{ fontSize: '18px' }} className='text-green-500' />
                <Text
                  strong
                  className={`ml-2 ${selectedSeatDetails?.seatId === seat.seatId ? '!text-red-700' : '!text-gray-800'}`}
                >
                  {seat.seatName}
                </Text>
              </div>
              <Title
                level={3}
                className={`!text-xl !font-bold !mb-2 ${selectedSeatDetails?.seatId === seat.seatId ? '!text-red-600' : '!text-gray-900'}`}
              >
                {(seat.price * flight.originPrice).toLocaleString('vi-VN')} VND
              </Title>
              <ul className='text-xs text-gray-600 space-y-1'>
                <li className='flex items-start'>
                  <CheckCircleOutlined
                    style={{ fontSize: '14px' }}
                    className='mr-1.5 mt-0.5 text-green-500 flex-shrink-0'
                  />
                  Available Quantity: {seat.quantityAvailable}
                </li>
              </ul>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
interface BookingState {
  currentStep: 'departure' | 'return' | 'checkout'
  departureFlightDetails: (IFlightTable & { selectedSeat: ISeat }) | null
  returnFlightDetails: (IFlightTable & { selectedSeat: ISeat }) | null
  queryConfig: QueryConfig
  amountPayment: number
}

const BookingPage = () => {
  const queryConfigFromUrl = useQueryConfig()

  // const queryConfigFromUrl = omit(initialQueryConfig, ['passengerNumber'])
  const [bookingState, setBookingState] = useState<BookingState>({
    currentStep: 'departure',
    departureFlightDetails: null,
    returnFlightDetails: null,
    queryConfig: {
      'arrivalAirport.city.cityName': queryConfigFromUrl['arrivalAirport.city.cityName'] || 'Ho Chi Minh City',
      'departureAirport.city.cityName': queryConfigFromUrl['departureAirport.city.cityName'] || 'Hanoi',
      departureTime: queryConfigFromUrl.departureTime || '2025-12-10T10:00:00Z',
      tripType: queryConfigFromUrl.tripType || 'round-trip',
      returnTime: queryConfigFromUrl.returnTime || '2025-12-15T14:00:00Z',
      passengerNumber: queryConfigFromUrl.passengerNumber || '1',
      ...queryConfigFromUrl
    },
    amountPayment: 0
  })

  const [currentFlights, setCurrentFlights] = useState<IFlightTable[]>([])

  const buildFlightFilterQuery = (queryConfig: QueryParamsSearch) => {
    const { departureTime, departureCityName, arrivalCityName } = queryConfig

    const filterParts: string[] = []

    if (departureCityName) {
      filterParts.push(`departureAirport.city.cityName:'${encodeURIComponent(departureCityName)}'`)
    }

    if (arrivalCityName) {
      filterParts.push(`arrivalAirport.city.cityName:'${encodeURIComponent(arrivalCityName)}'`)
    }

    if (departureTime) {
      filterParts.push(`departureTime~'${encodeURIComponent(departureTime)}'`)
    }

    const filterString = filterParts.join(' and ')

    const apiUrl = `api/flights?filter=${filterString}`
    return apiUrl
  }

  const {
    data: departureFlightsData,
    isLoading: isLoadingDepartureFlights,
    isError: isDepartureFlightsError
    // refetch: refetchDepartureFlights
  } = useQuery({
    queryKey: ['departureFlights', bookingState.queryConfig],
    queryFn: async () => {
      // const departureParams = {
      //   ...omit(bookingState.queryConfig, ['tripType', 'passengerNumber']),
      //   'departureAirport.city.cityName': bookingState.queryConfig['departureAirport.city.cityName'],
      //   'arrivalAirport.city.cityName': bookingState.queryConfig['arrivalAirport.city.cityName'],
      //   departureTime: bookingState.queryConfig.departureTime
      // }

      // console.log('Fetching departure flights with config:', departureParams)

      const url = buildFlightFilterQuery({
        departureCityName: bookingState.queryConfig['departureAirport.city.cityName'] as string,
        arrivalCityName: bookingState.queryConfig['arrivalAirport.city.cityName'] as string,
        departureTime: bookingState.queryConfig.departureTime as string
      })

      return flightApi.getFlights(url)
    },
    enabled: bookingState.currentStep === 'departure'
    // staleTime: 5 * 60 * 1000 // 5 minutes
  })

  const {
    data: returnFlightsData,
    isLoading: isLoadingReturnFlights,
    isError: isReturnFlightsError
    // refetch: refetchReturnFlights
  } = useQuery({
    queryKey: ['returnFlights', bookingState.queryConfig, bookingState.departureFlightDetails?.id],
    queryFn: async () => {
      // const returnParams = {
      //   ...omit(bookingState.queryConfig, ['tripType', 'passengerNumber']),
      //   // passengerNumber: Number(bookingState.queryConfig.passengerNumber) || 1,
      //   'departureAirport.city.cityName': bookingState.queryConfig['arrivalAirport.city.cityName'],
      //   'arrivalAirport.city.cityName': bookingState.queryConfig['departureAirport.city.cityName'],
      //   departureTime: bookingState.queryConfig.returnTime
      // }
      // console.log('Fetching return flights with config:', returnParams)

      const url = buildFlightFilterQuery({
        departureCityName: bookingState.queryConfig['arrivalAirport.city.cityName'] as string,
        arrivalCityName: bookingState.queryConfig['departureAirport.city.cityName'] as string,
        departureTime: bookingState.queryConfig.returnTime as string
      })

      return flightApi.getFlights(url)
    },
    enabled: bookingState.currentStep === 'return' && bookingState.queryConfig.tripType === 'round-trip'
    // staleTime: 5 * 60 * 1000 // 5 minutes
  })

  useEffect(() => {
    if (bookingState.currentStep === 'departure') {
      setCurrentFlights(departureFlightsData?.data.result || [])
    } else if (bookingState.currentStep === 'return') {
      setCurrentFlights(returnFlightsData?.data.result || [])
    }
  }, [bookingState.currentStep, departureFlightsData, returnFlightsData])

  const handleSelectSeat = (flightId: string, seat: ISeat) => {
    const selectedFlight = currentFlights?.find((f) => f.id === flightId)

    if (selectedFlight) {
      const flightWithSeat = { ...selectedFlight, selectedSeat: seat }
      if (bookingState.currentStep === 'departure') {
        setBookingState((prevState) => ({
          ...prevState,
          departureFlightDetails: flightWithSeat,
          returnFlightDetails: null
        }))
      } else if (bookingState.currentStep === 'return') {
        setBookingState((prevState) => ({
          ...prevState,
          returnFlightDetails: flightWithSeat
        }))
      }
      message.success(`Selected seat ${seat.seatName} for ${bookingState.currentStep} `)
    }
  }

  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) {
        const [hours, minutes] = dateString.split(':').map(Number)
        const dummyDate = new Date()
        dummyDate.setHours(hours, minutes, 0, 0)
        return dummyDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
      }
      return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch (error) {
      console.error('Error formatting date:', error)
      return 'Invalid Date'
    }
  }

  const handleContinueToReturnFlight = () => {
    console.log('Chuyến đi đã chọn:', bookingState.departureFlightDetails)
    setBookingState((prevState) => ({
      ...prevState,
      currentStep: 'return',

      returnFlightDetails: null
    }))
  }

  const handleGoBackToDepartureSelection = () => {
    setBookingState((prevState) => ({
      ...prevState,
      currentStep: 'departure',
      returnFlightDetails: null
    }))
  }

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleProceedToCheckout = () => {
    console.log('Proceeding to checkout with:', bookingState)
    message.success('Proceeding to Checkout!')
    dispatch(setBookingFlight(bookingState))
    navigate('passenger')
  }

  const currentTitle =
    bookingState.currentStep === 'departure' ? 'Select Your Departure Flight' : 'Select Your Return Flight'
  const currentFlightInfo =
    bookingState.currentStep === 'departure'
      ? {
          from: bookingState.queryConfig['departureAirport.city.cityName'],
          fromCode: bookingState.departureFlightDetails?.departureAirportName?.split('_')[0] || 'N/A',
          to: bookingState.queryConfig['arrivalAirport.city.cityName'],
          toCode: bookingState.departureFlightDetails?.arrivalAirportName?.split('_')[0] || 'N/A',
          date: formatDisplayDate(bookingState.queryConfig.departureTime || '')
        }
      : {
          from: bookingState.queryConfig['arrivalAirport.city.cityName'],
          fromCode: bookingState.departureFlightDetails?.arrivalAirportName?.split('_')[0] || 'N/A',
          to: bookingState.queryConfig['departureAirport.city.cityName'],
          toCode: bookingState.departureFlightDetails?.departureAirportName?.split('_')[0] || 'N/A',
          date: formatDisplayDate(bookingState.queryConfig.returnTime || '')
        }

  const isLoading = isLoadingDepartureFlights || isLoadingReturnFlights
  const isError = isDepartureFlightsError || isReturnFlightsError

  if (isLoading) {
    return <div className='w-full max-w-5xl mx-auto py-20 px-4 text-center'>Loading flights...</div>
  }

  if (isError) {
    return (
      <div className='w-full max-w-5xl mx-auto py-20 px-4 text-center text-red-600'>
        Error loading flights. Please try again.
      </div>
    )
  }

  return (
    <div className='w-full max-w-5xl mx-auto py-20 px-4'>
      <div className='bg-white p-4 sm:p-6 rounded-lg shadow-lg mb-6'>
        <Title level={2} className='!text-2xl !font-bold !text-gray-800 !mb-1'>
          {currentTitle}
        </Title>
        <Text className='!text-gray-600'>
          {currentFlightInfo.from} ({currentFlightInfo.fromCode}) to {currentFlightInfo.to} ({currentFlightInfo.toCode})
          {' - '}
          {currentFlightInfo.date}
          {bookingState.queryConfig.tripType === 'round-trip' &&
            bookingState.queryConfig.returnTime &&
            bookingState.currentStep === 'departure' &&
            ` to ${formatDisplayDate(bookingState.queryConfig.returnTime)}`}
        </Text>
        <Text type='secondary' className='!block !text-sm'>
          {bookingState.queryConfig.passengerNumber} Passenger(s)
        </Text>
      </div>

      {/* Display flights */}
      {currentFlights.length === 0 ? (
        <div className='text-center py-10'>
          <SearchOutlined style={{ fontSize: '48px' }} className='mx-auto text-gray-400 mb-4' />
          <Title level={3} className='!text-xl !font-semibold !text-gray-700'>
            No flights found
          </Title>
          <Text type='secondary' className='!text-gray-500'>
            Try adjusting your search criteria.
          </Text>
        </div>
      ) : (
        currentFlights.map((flight) => (
          <FlightCard
            key={flight.id}
            flight={flight}
            onSelectSeat={handleSelectSeat}
            isSelected={
              (bookingState.currentStep === 'departure' && bookingState.departureFlightDetails?.id === flight.id) ||
              (bookingState.currentStep === 'return' && bookingState.returnFlightDetails?.id === flight.id)
            }
          />
        ))
      )}

      {/* Selected Flight Details Section */}
      {(bookingState.currentStep === 'departure' && bookingState.departureFlightDetails) ||
      (bookingState.currentStep === 'return' && bookingState.returnFlightDetails) ? (
        <div className='mt-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-lg'>
          <Title level={3} className='!text-xl !font-semibold !text-green-700 !mb-3'>
            Your Selection:
          </Title>
          {bookingState.departureFlightDetails && (
            <>
              <Text className='!block !text-gray-700'>
                Departure Flight: {bookingState.departureFlightDetails.flightCode}{' '}
                {bookingState.departureFlightDetails.departureAirportName} -{' '}
                {bookingState.departureFlightDetails.arrivalAirportName}
              </Text>
              <Text className='!block !text-gray-700'>
                Departure Seat: {bookingState.departureFlightDetails.selectedSeat.seatName}
              </Text>
            </>
          )}
          {bookingState.returnFlightDetails && (
            <>
              <Text className='!block !text-gray-700 mt-2'>
                Return Flight: {bookingState.returnFlightDetails.flightCode}{' '}
                {bookingState.returnFlightDetails.departureAirportName} -{' '}
                {bookingState.returnFlightDetails.arrivalAirportName}
              </Text>
              <Text className='!block !text-gray-700'>
                Return Seat: {bookingState.returnFlightDetails.selectedSeat.seatName}
              </Text>
            </>
          )}
          <Title level={2} className='!text-2xl !font-bold !text-green-600 !mt-2'>
            Total:{' '}
            {(
              (bookingState.departureFlightDetails?.selectedSeat?.price || 0) +
              (bookingState.returnFlightDetails?.selectedSeat?.price || 0)
            ).toLocaleString('vi-VN')}{' '}
            VND
          </Title>
        </div>
      ) : null}

      {/* Navigation Buttons */}
      <div className='mt-8 pt-6 border-t border-gray-200 flex justify-between items-center'>
        {/* Back button for return flight selection */}
        {bookingState.queryConfig.tripType === 'round-trip' && bookingState.currentStep === 'return' && (
          <Button
            onClick={handleGoBackToDepartureSelection}
            type='default'
            size='large'
            icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
            className='!bg-gray-200 hover:!bg-gray-300 !text-gray-800 !font-bold !py-3 !px-6 !rounded-lg !shadow-md hover:!shadow-lg !transition-all !duration-300 !flex !items-center !justify-center !space-x-2'
            style={{ height: 'auto' }}
          >
            Back to Departure Flights
          </Button>
        )}

        {/* Conditional "Select Return Flight" or "Proceed to Checkout" button */}
        {bookingState.currentStep === 'departure' &&
          bookingState.departureFlightDetails &&
          bookingState.queryConfig.tripType === 'round-trip' && (
            <Button
              onClick={handleContinueToReturnFlight}
              type='primary'
              size='large'
              icon={<ArrowRightOutlined style={{ fontSize: '20px' }} />}
              className='!bg-blue-600 hover:!bg-blue-700 !text-white !font-bold !py-3 !px-8 !rounded-lg !shadow-md hover:!shadow-lg !transition-all !duration-300 !flex !items-center !justify-center !space-x-2 ml-auto'
              style={{ height: 'auto' }}
            >
              Select Return Flight
            </Button>
          )}

        {((bookingState.currentStep === 'departure' &&
          bookingState.queryConfig.tripType === 'one-way' &&
          bookingState.departureFlightDetails) ||
          (bookingState.currentStep === 'return' &&
            bookingState.queryConfig.tripType === 'round-trip' &&
            bookingState.returnFlightDetails &&
            bookingState.departureFlightDetails)) && (
          <Button
            onClick={handleProceedToCheckout}
            type='primary'
            size='large'
            icon={<ArrowRightOutlined style={{ fontSize: '20px' }} />}
            className='!bg-red-600 hover:!bg-red-700 !text-white !font-bold !py-3 !px-8 !rounded-lg !shadow-md hover:!shadow-lg !transition-all !duration-300 !flex !items-center !justify-center !space-x-2 ml-auto'
            style={{ height: 'auto' }}
          >
            Proceed to Checkout
          </Button>
        )}
      </div>
    </div>
  )
}

export default BookingPage
