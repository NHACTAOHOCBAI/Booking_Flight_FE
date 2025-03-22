/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface APIResponse<T> {
    code: number
    message: string
    result?: T[]
  }
}

export const airportData: IAirportTable[] = [
  { id: '1', airportCode: 'SGN', airportName: 'Tan Son Nhat International Airport', cityId: '1' },
  { id: '2', airportCode: 'HAN', airportName: 'Noi Bai International Airport', cityId: '2' },
  { id: '3', airportCode: 'DAD', airportName: 'Da Nang International Airport', cityId: '3' },
  { id: '4', airportCode: 'CXR', airportName: 'Cam Ranh International Airport', cityId: '4' },
  { id: '5', airportCode: 'VCS', airportName: 'Con Dao Airport', cityId: '5' },
  { id: '6', airportCode: 'PQC', airportName: 'Phu Quoc International Airport', cityId: '6' },
  { id: '7', airportCode: 'VII', airportName: 'Vinh International Airport', cityId: '7' },
  { id: '8', airportCode: 'HUI', airportName: 'Phu Bai International Airport', cityId: '8' },
  { id: '9', airportCode: 'BMV', airportName: 'Buon Ma Thuot Airport', cityId: '9' },
  { id: '10', airportCode: 'VCA', airportName: 'Can Tho International Airport', cityId: '10' }
]

export {}

// airport
// interface IFakeAirportItem {
//     airportCode: string,
//     airportName: string,
//     location: string
// }
// interface IAirportItem {
//     _id: string,
//     name: string,
//     city: string,
//     country: string
// }
// interface INewAirportItem {
//     name: string,
//     city: string,
//     country: string
// }
// interface IUpdateAirportItem {
//     _id: string,
//     name: string,
//     city: string,
//     country: string
// }
// //account
// interface IAccountItem {
//     _id: string,
//     username: string,
//     phone: string,
//     fullName: string,
//     dob: string,
//     createdAt: string,
//     updatedAt: string,
//     gender: string,
//     role: string,
// }
// interface INewAccountItem {
//     username: string,
//     password: string,
//     phone: string,
//     fullName: string,
//     dob: string,
//     gender: string,
//     role: string,
// }
// interface IUpdateAccountItem {
//     _id: string,
//     username: string,
//     password: string,
//     phone: string,
//     fullName: string,
//     dob: string,
//     gender: string,
//     role: string,
// }
// //seat
// interface ISeatItem {
//     _id: string,
//     name: string,
//     price: number,
//     description: string,
// }
// interface INewSeatItem {
//     name: string,
//     price: number,
//     description: string,
// }
// interface IUpdateSeatItem {
//     _id: string,
//     name: string,
//     price: number,
//     description: string,
// }
// //Flight
// interface IFlightItem {
//     _id: string,
//     planeId: string,
//     planeName: string,
//     departureId: string,
//     departureName: string,
//     arrivalId: string,
//     arrivalName: string,
//     departureTime: string,
//     arrivalTime: string,
//     price: number,
//     ticket: {
//         type: ISeatItem,
//         quantity: number
//     }[],
//     interAirport: {
//         _id: string,
//         arrivalTime: string,
//         departureTime: string
//     }[]
// }
// interface INewFlightItem {
//     planeId: string,
//     departureId: string,
//     arrivalId: string,
//     departureTime: string,
//     arrivalTime: string,
//     price: number,
//     ticket: {
//         ticketId: string,
//         quantity: number
//     }[]
//     interAirport: {
//         _id: string,
//         arrivalTime: string,
//         departureTime: string
//     }[]
// }
// interface IUpdateFlightItem {
//     _id: string,
//     planeId: string,
//     departureId: string,
//     arrivalId: string,
//     departureTime: string,
//     arrivalTime: string,
//     price: number,
//     ticket: {
//         ticketId: string,
//         quantity: number
//     }[]
//     interAirport: {
//         _id: string,
//         arrivalTime: string,
//         departureTime: string
//     }[]
// }
// //plane
// interface IPlaneItem {
//     id: string,
//     name: string,
//     airline: string
// }
// interface INewPlaneItem {
//     name: string,
//     airline: string
// }
// interface IUpdatePlaneItem {
//     id: string,
//     name: string,
//     airline: string
// }
