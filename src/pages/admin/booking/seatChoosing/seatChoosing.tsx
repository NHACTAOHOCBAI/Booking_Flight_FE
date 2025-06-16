import { useAppSelector } from '@/redux/hooks'
import React from 'react'
import SeatChoosingComponent from './SeatChoosingComponent'
interface IProp {
  openNotification: (check?: number) => void

  departureSeat: {
    ticketId: string
    seatNumber: number
  }[]
  setDepartureSeat: React.Dispatch<
    React.SetStateAction<
      {
        ticketId: string
        seatNumber: number
      }[]
    >
  >

  returnSeats: {
    ticketId: string
    seatNumber: number
  }[]
  setReturnSeats: React.Dispatch<
    React.SetStateAction<
      {
        ticketId: string
        seatNumber: number
      }[]
    >
  >
}

export default function SeatChoosing({
  openNotification,
  departureSeat,
  setDepartureSeat,
  returnSeats,
  setReturnSeats
}: IProp) {
  const bookingFlight = useAppSelector((state) => state.bookingFlight)
  const departureFlight = bookingFlight.departureFlightDetails
  const returnFlight = bookingFlight.returnFlightDetails
  return (
    <>
      <SeatChoosingComponent
        selectedSeats={departureSeat}
        setSelectedSeats={setDepartureSeat}
        openNotification={openNotification}
        flightDetails={departureFlight!}
      />
      {returnFlight && (
        <SeatChoosingComponent
          selectedSeats={returnSeats}
          setSelectedSeats={setReturnSeats}
          openNotification={openNotification}
          flightDetails={returnFlight}
        />
      )}
    </>
  )
}
