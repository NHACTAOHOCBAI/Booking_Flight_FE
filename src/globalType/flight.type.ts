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
        interAirport: IInterAirport[]
        seat: ISeat[]
    }
    interface IInterAirport {
        airportId: string
        departureTime: string
        arrivalTime: string
        note: string
    }
    interface ISeat {
        seatId: string,
        quantity: number
    }
}