/* eslint-disable @typescript-eslint/no-explicit-any */
import { MyProfileTicketRes } from '@/globalType/myProfile.type'
import html2canvas from 'html2canvas'
import { useEffect, useRef, useState } from 'react'
import { BsFillTicketPerforatedFill } from 'react-icons/bs'
import { message } from 'antd'
import { useMutation } from '@tanstack/react-query'
import bookingApi from '@/apis/apis/booking.api'
import { useLocation, useNavigate } from 'react-router-dom'

interface TicketAdminProps {
  ticket?: MyProfileTicketRes
}

const TicketAdmin: React.FC<TicketAdminProps> = ({ ticket: ticketFromProps }) => {
  const location = useLocation()
  const ticket = ticketFromProps || location.state?.updatedTicket
  const navigate = useNavigate()
  const captureRef = useRef<HTMLDivElement>(null)
  const [urlImage, setUrlImage] = useState<string | null>(null)
  console.log(ticket)
  const flight = ticket?.flight
  const seat = ticket?.seat

  const passengerName = ticket?.passengerName || 'N/A'
  const seatNumber = ticket?.seatNumber ?? 'N/A'
  const departureCity = flight?.departureAirport?.city?.cityName || 'N/A'
  const arrivalCity = flight?.arrivalAirport?.city?.cityName || 'N/A'
  const airlineName = flight?.plane?.airline?.airlineName || 'N/A'
  const seatClass = seat?.seatName || 'N/A'
  const flightCode = flight?.flightCode || 'N/A'
  const departureTime = flight?.departureTime || 'N/A'

  const bookingFlightMutation = useMutation({
    mutationFn: bookingApi.bookingFlight,
    onSuccess: () => {
      message.success('Booking successful!')
      navigate('/admin')
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || 'Booking failed.'
      message.error(`${errorMessage} Please try again.`)
    }
  })

  useEffect(() => {
    const generateImage = async () => {
      if (captureRef.current) {
        const canvas = await html2canvas(captureRef.current)
        const dataUrl = canvas.toDataURL('image/png')
        setUrlImage(dataUrl)
      }
    }

    if (ticket) {
      generateImage()
    }
  }, [ticket])

  const handleCheckout = () => {
    if (!ticket || !urlImage) {
      return message.error('Missing ticket or image is not ready.')
    }

    const { id, passengerName, passengerPhone, passengerIDCard, passengerEmail, seatNumber } = ticket

    if (!flight?.id || !seat?.id) {
      return message.error('Missing flight or seat info')
    }

    const body = {
      flightId: flight.id,
      seatId: seat.id,
      passengers: [
        {
          ticketId: id,
          passengerName,
          passengerPhone,
          passengerIDCard,
          passengerEmail,
          seatNumber,
          urlImage
        }
      ]
    }

    bookingFlightMutation.mutate(body)
  }

  return (
    <>
      <div ref={captureRef} className='w-[950px] rounded-xl overflow-hidden shadow hover:shadow-md border'>
        <div className='bg-[#0984e3] h-[60px] flex justify-between items-end'>
          <div className='px-4 py-2 text-white font-bold text-lg'>{airlineName}</div>
          <div className='px-4 pb-0 text-white font-bold text-lg flex items-center'>
            BOARDING PASS
            <BsFillTicketPerforatedFill className='w-10 h-10 ml-2 mb-1' />
          </div>
        </div>

        <div className='flex'>
          <div className='w-[70%] m-4'>
            <div className='flex gap-4 mb-5'>
              <div className='w-[40%] text-left'>
                <div className='font-bold text-base mb-1'>Passenger Name :</div>
                <div className='text-base'>{passengerName}</div>
              </div>
              <div className='w-[30%] text-left'>
                <div className='font-bold text-base mb-1'>From :</div>
                <div className='text-base'>{departureCity}</div>
              </div>
              <div className='w-[30%] text-left'>
                <div className='font-bold text-base mb-1'>To :</div>
                <div className='text-base'>{arrivalCity}</div>
              </div>
            </div>

            <div className='flex gap-4'>
              <div className='w-[40%] text-left'>
                <div className='font-bold text-base mb-1'>Seat :</div>
                <div className='text-base'>{seatNumber}</div>
              </div>
              <div className='w-[30%] text-left'>
                <div className='font-bold text-base mb-1'>Boarding Time :</div>
                <div className='text-base'>{departureTime}</div>
              </div>
              <div className='w-[30%] text-left'>
                <div className='font-bold text-base mb-1'>Flight Code :</div>
                <div className='text-base'>{flightCode}</div>
              </div>
            </div>
          </div>

          <div className='w-[2px] border-l-2 border-dashed border-[#0984e3]'></div>

          <div className='w-[30%] items-start flex flex-col gap-2 m-4 text-sm'>
            <div>
              <span className='font-bold'>Passenger Name:</span> {passengerName}
            </div>
            <div>
              <span className='font-bold'>From:</span> {departureCity}
            </div>
            <div>
              <span className='font-bold'>To:</span> {arrivalCity}
            </div>
            <div>
              <span className='font-bold'>Seat Class:</span> {seatClass}
            </div>
            <div>
              <span className='font-bold'>Boarding Time:</span> {departureTime}
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleCheckout} className='mt-4 px-4 py-2 rounded text-white bg-green-600 hover:bg-green-700'>
        Checkout
      </button>
    </>
  )
}

export default TicketAdmin
