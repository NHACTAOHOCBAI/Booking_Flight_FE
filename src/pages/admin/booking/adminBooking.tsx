import React, { useEffect, useState } from 'react'
import FirstStep from './firstStep/firstStep'
import SecondStep from './secondStep/secondStep'
import ThirdStep from './thirdStep/thirdStep'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice'
import { setBookingTicketsList } from '@/redux/features/bookingTicket/bookingTicketsList'
import { useGetFlightById } from '@/hooks/useFlight'
import { message } from 'antd'

interface AdminBookingProps {
  passengerNumber?: number
}

const AdminBooking: React.FC<AdminBookingProps> = ({ passengerNumber = 1 }) => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const { flightId } = useParams()
  const bookingFlight = useGetFlightById(flightId as string).data?.data
  const dispatch = useAppDispatch()
  const [current, setCurrent] = useState(0)
  const navigate = useNavigate()

  const [showNotification, setShowNotification] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(false)

  useEffect(() => {
    dispatch(setBookingFlight(bookingFlight as IFlightTable))
    dispatch(setBookingTicketsList([]))
  }, [bookingFlight, dispatch])

  useEffect(() => {
    setNextDisabled(bookingTicketsList.length === 0)
  }, [bookingTicketsList])

  const openNotification = (check?: boolean) => {
    console.log(check)
    if (check === undefined) {
      setNextDisabled(true)
      setShowNotification(true)
    } else {
      // setNextDisabled(false)
      setShowNotification(false)
    }
  }

  const steps = [
    {
      title: 'Ticket information',
      content: <FirstStep passengerNumber={passengerNumber} openNotification={openNotification} />
    },
    {
      title: 'Review',
      content: <SecondStep />
    },
    {
      title: 'Complete',
      content: <ThirdStep />
    }
  ]

  return (
    <div className='pt-20 bg-white min-h-screen px-4'>
      {/* Steps header */}
      <div className='border-t-2 border-blue-500 border-dashed py-4'>
        <div className='flex justify-between text-sm font-medium'>
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={`flex-1 text-center ${current === index ? 'text-blue-600 font-semibold' : 'text-gray-400'}`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className='mt-4 p-6 text-center rounded-lg border border-dashed border-gray-300 text-gray-700'>
        {steps[current].content}
      </div>

      {/* Notification */}
      {showNotification && (
        <div className='mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded'>
          Please add at least one ticket.
        </div>
      )}

      {/* Buttons */}
      <div className='mt-6 flex items-center gap-4'>
        {current < steps.length - 1 && (
          <button
            disabled={nextDisabled}
            onClick={() => {
              if (bookingTicketsList.length === 0) {
                openNotification()
                return
              }
              setCurrent(current + 1)
              setShowNotification(false)
            }}
            className={`px-4 py-2 rounded text-white ${
              nextDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        )}

        {current === steps.length - 1 && (
          <button
            onClick={() => {
              message.success('Hoàn thành đặt vé')
              navigate('/')
            }}
            className='px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700'
          >
            Done
          </button>
        )}

        {current > 0 && current !== steps.length - 1 && (
          <button
            onClick={() => setCurrent(current - 1)}
            className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300'
          >
            Previous
          </button>
        )}
      </div>
    </div>
  )
}

export default AdminBooking
