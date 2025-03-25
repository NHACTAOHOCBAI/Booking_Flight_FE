export { };

declare global {
    interface IFlightTable {
        id: string
        flightCode: string
        planeId: string
        departureAirportId: string
        arrivalAirportId: string
        departureTime: string
        arrivalTime: string
        originPrice: number
        interAirport: {
            airportId: string
            departureTime: string
            arrivalTime: string
            note: string
        }[]
        seat: {
            seatId: string,
            quantity: number
        }[]
    }
}