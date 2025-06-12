import { useBookingFlight, useCreatePayment } from '@/hooks/useBooking'
import { setBookingTicketsList } from '@/redux/features/bookingTicket/bookingTicketsList'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { message } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'

import FirstStep from './firstStep/firstStep'
import SecondStep from './secondStep/secondStep'

import { AppContext } from '@/context/app.context'
import Loading from '@/components/ErrorPage/Loading'
import html2canvas from 'html2canvas'

const AdminBooking: React.FC = () => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const dispatch = useAppDispatch()
  const [current, setCurrent] = useState(0)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const [showNotification, setShowNotification] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(false)

  const bookingFlight = useAppSelector((state) => state.bookingFlight)

  useEffect(() => {
    // dispatch(setBookingFlight(bookingFlight as IFlightTable))
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

  const { profile } = useContext(AppContext)
  const bookingFlightMutation = useBookingFlight()
  const { mutate: paymentMutation } = useCreatePayment()
  const handlePayment = async () => {
    const body = {
      amount: bookingFlight.amountPayment,
      orderInfo: 'Flight ticket checkout'
    }
    paymentMutation(body, {
      onSuccess(data) {
        const paymentUrl = data?.data.paymentUrl
        console.log(paymentUrl)
        if (paymentUrl) {
          setIsRedirecting(true)
          setTimeout(() => {
            window.location.href = paymentUrl
          }, 500)
        } else {
          message.error('Không nhận được URL thanh toán từ máy chủ.')
        }
      },
      onError(error: Error) {
        console.log(error)
        message.error(error.message)
      }
    })
  }

  const captureRef = useRef<HTMLDivElement>(null)

  const handleDownloadImage = async () => {
    if (captureRef.current) {
      const canvas = await html2canvas(captureRef.current)
      const dataUrl = canvas.toDataURL('image/png')

      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'flightTicket.png'
      return link
    }
  }
  const handleBooking = (flightId: string, seatId: string) => {
    return new Promise<void>((resolve, reject) => {
      const body = {
        flightId,
        seatId,
        ...(profile ? { accountId: profile.id } : {}),
        passengers: [...bookingTicketsList]
      }

      bookingFlightMutation.mutate(body, {
        onSuccess: () => {
          return resolve()
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          console.log(error)
          const errorMessage = error?.response?.data?.message + ' please choose another seat'
          message.error(errorMessage)
          reject(error)
        }
      })
    })
  }

  const steps = [
    {
      title: 'Ticket information',
      content: <FirstStep openNotification={openNotification} />
    },
    {
      title: 'Review',
      content: <SecondStep captureRef={captureRef} />
    }
  ]

  return (
    <>
      {isRedirecting ? (
        <Loading />
      ) : (
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

          <div className='mt-4 p-6 text-center rounded-lg border border-dashed border-gray-300 text-gray-700'>
            {steps[current].content}
          </div>

          {showNotification && (
            <div className='mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded'>
              Please add at least one ticket.
            </div>
          )}

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
                onClick={async () => {
                  console.log(bookingFlight)
                  const departure = bookingFlight.departureFlightDetails
                  const returnFlight = bookingFlight.returnFlightDetails

                  if (departure) {
                    await handleBooking(departure.id as string, departure.selectedSeat.seatId as string)
                  }

                  if (returnFlight) {
                    await handleBooking(returnFlight.id as string, returnFlight.selectedSeat.seatId as string)
                  }
                  handlePayment()
                }}
                className='px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700'
              >
                Checkout
              </button>
            )}

            {current > 0 && current !== steps.length && (
              <button
                onClick={() => setCurrent(current - 1)}
                className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300'
              >
                Previous
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default AdminBooking
