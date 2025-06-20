import { useBookingFlight, useCreatePayment } from '@/hooks/useBooking'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { message, Modal } from 'antd' // Import Modal
import React, { useContext, useEffect, useRef, useState } from 'react'

import FirstStep from './firstStep/firstStep'
import SecondStep from './secondStep/secondStep'

import Loading from '@/components/ErrorPage/Loading'
import { AppContext } from '@/context/app.context'
import { useNavigate } from 'react-router-dom'

import { CountdownTimer } from '@/components/CountdownTimer'
import { onErrorUtil } from '@/globalType/util.type'
import { usePickUpTicket } from '@/hooks/useTicket'
import { setBookingFlight } from '@/redux/features/bookingFlight/bookingFlightSlice'
import SeatChoosing from './seatChoosing/seatChoosing'

const AdminBooking: React.FC = () => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const dispatch = useAppDispatch()
  const [current, setCurrent] = useState(0)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { urlTicket } = useContext(AppContext)
  const [showNotification, setShowNotification] = useState(0)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false)
  const [departureSeat, setDepartureSeat] = useState<Array<{ ticketId: string; seatNumber: number }>>([])
  const [returnSeats, setReturnSeats] = useState<Array<{ ticketId: string; seatNumber: number }>>([])

  const [countdown, setCountdown] = useState<number | null>(null)
  const countdownRef = useRef<NodeJS.Timeout | null>(null)

  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  const navigate = useNavigate()
  // useEffect(() => {
  //   dispatch(setBookingTicketsList([]))
  //   setUrlTicket([])
  // }, [bookingFlight, dispatch])

  useEffect(() => {
    // console.log('bookingTicketsList:', bookingTicketsList)
    if (current > 0) setNextDisabled(bookingTicketsList.length === 0)
  }, [bookingTicketsList, current])

  const openNotification = (check?: number) => {
    if (check === undefined) {
      setNextDisabled(false)
      setShowNotification(0)
    } else {
      setNextDisabled(true)
      setShowNotification(check)
    }
  }

  const { profile } = useContext(AppContext)
  const bookingFlightMutation = useBookingFlight()
  const { mutate: paymentMutation } = useCreatePayment()

  const handlePayment = async () => {
    const body = {
      amount: bookingFlight.amountPayment,
      orderInfo: bookingFlight.ticketNumbers.map((item) => item.ticketId)
    }
    paymentMutation(body, {
      onSuccess(data) {
        const paymentUrl = data?.data.paymentUrl

        if (paymentUrl) {
          setIsRedirecting(true)
          setTimeout(() => {
            window.location.href = paymentUrl
          }, 500)
        } else {
          console.log('Did not receive payment URL from the server.')
        }
      },
      onError(error: Error) {
        console.log(error)
        message.error(error.message)
      }
    })
  }

  // const handleBooking = (flightId: string, seatId: string) => {
  //   return new Promise<void>((resolve, reject) => {
  //     const body = {
  //       flightId,
  //       seatId,
  //       ...(profile ? { accountId: profile.id } : {}),
  //       passengers: [...bookingTicketsList],
  //       urlImage: [...urlTicket]
  //     }

  //     bookingFlightMutation.mutate(body, {
  //       onSuccess: () => {
  //         return resolve()
  //       },
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //       onError: (error: any) => {
  //         console.log(error)
  //         const errorMessage = error?.response?.data?.message + ' please choose another seat'
  //         message.error(errorMessage)
  //         reject(error)
  //       }
  //     })
  //   })
  // }
  const handleBooking = async (flightId: string, seatId: string) => {
    let passengers = bookingTicketsList.map((item, index) => {
      return {
        ...item,
        urlImage: urlTicket[index],
        ticketId: bookingFlight.ticketNumbers[index].ticketId,
        seatNumber: bookingFlight.ticketNumbers[index].seatNumber
      }
    })
    if (bookingFlight.returnFlightDetails?.id === flightId)
      passengers = bookingTicketsList.map((item, index) => {
        return {
          ...item,
          urlImage: urlTicket[index],
          ticketId: bookingFlight.ticketNumbers[index + Number(bookingFlight.queryConfig.passengerNumber)].ticketId,
          seatNumber: bookingFlight.ticketNumbers[index + Number(bookingFlight.queryConfig.passengerNumber)].seatNumber
        }
      })
    const body = {
      flightId,
      seatId,
      ...(profile ? { accountId: profile.id } : {}),
      passengers: passengers
    }

    try {
      await bookingFlightMutation.mutateAsync(body)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message + ' please choose another seat'
      message.error(errorMessage || 'An error occurred while booking. Please try again.')
      throw error
    }
  }

  const steps = [
    {
      title: 'Choose seat',
      content: (
        <SeatChoosing
          departureSeat={departureSeat}
          setDepartureSeat={setDepartureSeat}
          openNotification={openNotification}
          returnSeats={returnSeats}
          setReturnSeats={setReturnSeats}
        />
      )
    },
    {
      title: 'Ticket information',
      content: <FirstStep openNotification={openNotification} />
    },
    {
      title: 'Review',
      content: <SecondStep />
    }
  ]

  useEffect(() => {
    setNextDisabled(true)
  }, [])

  const handleNextStep = () => {
    if (bookingTicketsList.length === 0 && current > 0) {
      openNotification(2)
      return
    }

    if (current === 0) {
      setIsConfirmModalVisible(true)
      return
    }
    if (current === 1) {
      const ticketNumbers = [
        ...departureSeat.map((seat) => {
          return { ticketId: seat.ticketId, seatNumber: seat.seatNumber }
        }),
        ...returnSeats.map((seat) => {
          return { ticketId: seat.ticketId, seatNumber: seat.seatNumber }
        })
      ]

      dispatch(
        setBookingFlight({
          ...bookingFlight,
          ticketNumbers: ticketNumbers
        })
      )
    }

    setCurrent(current + 1)
    setShowNotification(0)
  }
  const pickUpMutation = usePickUpTicket()
  const handleConfirmNext = async () => {
    const body = [...departureSeat.map((item) => item.ticketId), ...returnSeats.map((item) => item.ticketId)]

    pickUpMutation.mutate(body, {
      onSuccess: () => {
        setCountdown(1)

        countdownRef.current = setInterval(() => {
          setCountdown((prev) => {
            if (prev === null || prev <= 1) {
              clearInterval(countdownRef.current!)
              // navigate('/', { replace: true })
              return null
            }
            return prev - 1
          })
        }, 1000)
      },
      onError: (error: Error) => {
        console.error('Failed to pick ticket:', error)
        const errorMessage = onErrorUtil(error)
        message.error(errorMessage.content || 'Failed to pick ticket. Please choose another one')
        // navigate('/', { replace: true })
      }
    })
    setCurrent(current + 1)
    setShowNotification(0)
    setIsConfirmModalVisible(false)
  }

  const handleCancelModal = () => {
    setIsConfirmModalVisible(false)
  }

  return (
    <>
      {isRedirecting ? (
        <Loading />
      ) : (
        <div className='pt-20 bg-white min-h-screen px-4'>
          <CountdownTimer seconds={countdown} />

          {/* Steps header */}
          <div className='border-t-2 border-blue-500 border-dashed py-4'>
            <div className='flex justify-between text-sm font-medium'>
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className={`flex-1 text-center ${
                    current === index ? 'text-blue-600 font-semibold' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </div>
              ))}
            </div>
          </div>

          <div className='mt-4 p-6 text-center rounded-lg border border-dashed border-gray-300 text-gray-700'>
            {steps[current].content}
          </div>

          {showNotification === 1 && (
            <div className='mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded'>
              Please add at least one ticket.
            </div>
          )}

          {showNotification === 2 && (
            <div className='mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded'>Please choose seats.</div>
          )}

          <div className='mt-6 flex items-center gap-4'>
            {current < steps.length - 1 && (
              <button
                disabled={nextDisabled}
                onClick={handleNextStep} // Call the new handler
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
                  const departure = bookingFlight.departureFlightDetails
                  const returnFlight = bookingFlight.returnFlightDetails
                  try {
                    if (departure) {
                      await handleBooking(departure.id as string, departure.selectedSeat.seatId as string)
                    }

                    if (returnFlight) {
                      await handleBooking(returnFlight.id as string, returnFlight.selectedSeat.seatId as string)
                    }
                    handlePayment()
                  } catch {
                    navigate('/', { replace: true })
                  }
                }}
                className='px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700'
              >
                Checkout
              </button>
            )}
            {current === 2 && (
              <button
                onClick={() => setCurrent(current - 1)}
                className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300'
              >
                Previous
              </button>
            )}

            <Modal
              title='Confirm Information'
              open={isConfirmModalVisible}
              onOk={handleConfirmNext}
              onCancel={handleCancelModal}
              okText='Confirm and Continue'
              cancelText='Go Back'
              maskClosable={false}
            >
              <p>
                Please carefully check the information you have entered. After confirming, you will not be able to
                return to this step to make edits.
              </p>
            </Modal>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminBooking
