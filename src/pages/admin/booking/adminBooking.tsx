import { useBookingFlight, useCreatePayment } from '@/hooks/useBooking'
import { setBookingTicketsList } from '@/redux/features/bookingTicket/bookingTicketsList'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { message, Modal } from 'antd' // Import Modal
import React, { useContext, useEffect, useState } from 'react'

import FirstStep from './firstStep/firstStep'
import SecondStep from './secondStep/secondStep'

import { AppContext } from '@/context/app.context'
import Loading from '@/components/ErrorPage/Loading'

const AdminBooking: React.FC = () => {
  const bookingTicketsList = useAppSelector((state) => state.bookingTicketsList)
  const dispatch = useAppDispatch()
  const [current, setCurrent] = useState(0)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { urlTicket, setUrlTicket } = useContext(AppContext)
  const [showNotification, setShowNotification] = useState(false)
  const [nextDisabled, setNextDisabled] = useState(false)
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false) // New state for modal

  const bookingFlight = useAppSelector((state) => state.bookingFlight)

  useEffect(() => {
    dispatch(setBookingTicketsList([]))
    setUrlTicket([])
  }, [bookingFlight, dispatch])

  useEffect(() => {
    setNextDisabled(bookingTicketsList.length === 0)
  }, [bookingTicketsList])

  const openNotification = (check?: boolean) => {
    if (check === undefined) {
      setNextDisabled(true)
      setShowNotification(true)
    } else {
      // setNextDisabled(false) // This line is commented out in original code, keeping it that way
      setShowNotification(false)
    }
  }

  const { profile } = useContext(AppContext)
  const bookingFlightMutation = useBookingFlight()
  const { mutate: paymentMutation } = useCreatePayment()

  const handlePayment = async () => {
    const body = {
      amount: bookingFlight.amountPayment,
      orderInfo: urlTicket.map((ticket) => ticket.ticketId)
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
          message.error('Did not receive payment URL from the server.')
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
    const body = {
      flightId,
      seatId,
      ...(profile ? { accountId: profile.id } : {}),
      passengers: [...bookingTicketsList],
      urlImage: [...urlTicket]
    }

    try {
      await bookingFlightMutation.mutateAsync(body)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message + ' please choose another seat'
      message.error(errorMessage || 'An error occurred while booking. Please try again.')
      throw error // Rất quan trọng để báo cho nơi gọi biết là có lỗi
    }
  }

  const steps = [
    {
      title: 'Ticket information',
      content: <FirstStep openNotification={openNotification} />
    },
    {
      title: 'Review',
      content: <SecondStep />
    }
  ]

  // Function to handle opening the confirmation modal
  const handleNextStep = () => {
    if (bookingTicketsList.length === 0) {
      openNotification()
      return
    }

    if (current === 0) {
      setIsConfirmModalVisible(true) // Show confirmation modal if on the first step
    } else {
      setCurrent(current + 1) // Otherwise, proceed to the next step
      setShowNotification(false)
    }
  }

  // Function to handle confirmation from the modal
  const handleConfirmNext = () => {
    setCurrent(current + 1)
    setShowNotification(false)
    setIsConfirmModalVisible(false) // Close the modal
  }

  const handleCancelModal = () => {
    setIsConfirmModalVisible(false) // Close the modal if user cancels
  }

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

          {showNotification && (
            <div className='mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded'>
              Please add at least one ticket.
            </div>
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

            {/* Ant Design Modal for confirmation */}
            <Modal
              title='Confirm Information'
              open={isConfirmModalVisible} // Use 'open' prop for Ant Design v5+
              onOk={handleConfirmNext}
              onCancel={handleCancelModal}
              okText='Confirm and Continue'
              cancelText='Go Back'
              maskClosable={false} // Prevents closing by clicking outside
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
