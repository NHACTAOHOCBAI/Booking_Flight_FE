/* eslint-disable @typescript-eslint/no-explicit-any */
export { };

declare global {
    // airport
    interface IAirportItem {
        _id: string,
        name: string,
        city: string,
        country: string
    }
    interface INewAirportItem {
        name: string,
        city: string,
        country: string
    }
    interface IUpdateAirportItem {
        _id: string,
        name: string,
        city: string,
        country: string
    }
    //account
    interface IAccountItem {
        _id: string,
        username: string,
        phone: string,
        fullName: string,
        dob: string,
        createdAt: string,
        updatedAt: string,
        gender: string,
        role: string,
    }
    interface INewAccountItem {
        username: string,
        password: string,
        phone: string,
        fullName: string,
        dob: string,
        gender: string,
        role: string,
    }
    interface IUpdateAccountItem {
        _id: string,
        username: string,
        password: string,
        phone: string,
        fullName: string,
        dob: string,
        gender: string,
        role: string,
    }
    //seat
    interface ISeatItem {
        _id: string,
        name: string,
        price: number,
        description: string,
    }
    interface INewSeatItem {
        name: string,
        price: number,
        description: string,
    }
    interface IUpdateSeatItem {
        _id: string,
        name: string,
        price: number,
        description: string,
    }
    //Flight
    interface IFlightItem {
        _id: string,
        planeId: string,
        planeName: string,
        departureId: string,
        departureName: string,
        arrivalId: string,
        arrivalName: string,
        departureTime: string,
        arrivalTime: string,
        price: number,
        ticket: {
            type: ISeatItem,
            quantity: number
        }[]
    }
    interface INewFlightItem {
        planeId: string,
        departureId: string,
        arrivalId: string,
        departureTime: string,
        arrivalTime: string,
        price: number,
        ticket: {
            ticketId: string,
            quantity: number
        }[]
        // [key: string]: any,
    }
}