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
export const flightData: IFlightTable[] = [
  {
    id: '1',
    flightCode: 'FL001',
    planeId: '1',
    departureAirportId: '1',
    arrivalAirportId: '2',
    departureTime: '2025-04-01T00:30:00Z',
    arrivalTime: '2025-04-01T22:00:00Z',
    originPrice: 150,
    interAirport: [
      {
        airportId: "2",
        arrivalTime: "2025-04-01T08:00:00Z",
        departureTime: "2025-04-01T10:30:00Z",
        note: "Unfortunately, there are some problem with my plane, so we have to stop by nearly airport to take off. I hope you will understand for us"
      }
    ],
    seat: [
      { seatId: '1', quantity: 50 }, // Hạng 1
      { seatId: '2', quantity: 30 }, // Hạng 2
      { seatId: '3', quantity: 20 } // Hạng 3
    ]
  },
  {
    id: '2',
    flightCode: 'FL002',
    planeId: '2',
    departureAirportId: '2',
    arrivalAirportId: '3',
    departureTime: '2025-04-02T10:00:00Z',
    arrivalTime: '2025-04-02T12:30:00Z',
    originPrice: 200,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 45 },
      { seatId: '2', quantity: 25 },
      { seatId: '3', quantity: 15 }
    ]
  },
  {
    id: '3',
    flightCode: 'FL003',
    planeId: '3',
    departureAirportId: '3',
    arrivalAirportId: '4',
    departureTime: '2025-04-03T14:00:00Z',
    arrivalTime: '2025-04-03T16:00:00Z',
    originPrice: 180,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 40 },
      { seatId: '2', quantity: 20 },
      { seatId: '3', quantity: 10 }
    ]
  },
  {
    id: '4',
    flightCode: 'FL004',
    planeId: '4',
    departureAirportId: '4',
    arrivalAirportId: '5',
    departureTime: '2025-04-04T09:00:00Z',
    arrivalTime: '2025-04-04T11:30:00Z',
    originPrice: 220,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 55 },
      { seatId: '2', quantity: 35 },
      { seatId: '3', quantity: 25 }
    ]
  },
  {
    id: '5',
    flightCode: 'FL005',
    planeId: '5',
    departureAirportId: '5',
    arrivalAirportId: '6',
    departureTime: '2025-04-05T07:30:00Z',
    arrivalTime: '2025-04-05T09:45:00Z',
    originPrice: 170,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 60 },
      { seatId: '2', quantity: 40 },
      { seatId: '3', quantity: 30 }
    ]
  },
  {
    id: '6',
    flightCode: 'FL006',
    planeId: '6',
    departureAirportId: '6',
    arrivalAirportId: '7',
    departureTime: '2025-04-06T12:00:00Z',
    arrivalTime: '2025-04-06T14:30:00Z',
    originPrice: 190,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 50 },
      { seatId: '2', quantity: 30 },
      { seatId: '3', quantity: 15 }
    ]
  },
  {
    id: '7',
    flightCode: 'FL007',
    planeId: '7',
    departureAirportId: '7',
    arrivalAirportId: '8',
    departureTime: '2025-04-07T16:00:00Z',
    arrivalTime: '2025-04-07T18:30:00Z',
    originPrice: 210,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 45 },
      { seatId: '2', quantity: 25 },
      { seatId: '3', quantity: 10 }
    ]
  },
  {
    id: '8',
    flightCode: 'FL008',
    planeId: '8',
    departureAirportId: '8',
    arrivalAirportId: '9',
    departureTime: '2025-04-08T18:00:00Z',
    arrivalTime: '2025-04-08T20:15:00Z',
    originPrice: 250,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 55 },
      { seatId: '2', quantity: 35 },
      { seatId: '3', quantity: 20 }
    ]
  },
  {
    id: '9',
    flightCode: 'FL009',
    planeId: '9',
    departureAirportId: '9',
    arrivalAirportId: '10',
    departureTime: '2025-04-09T20:00:00Z',
    arrivalTime: '2025-04-09T22:45:00Z',
    originPrice: 230,
    interAirport: [],
    seat: [
      { seatId: '1', quantity: 60 },
      { seatId: '2', quantity: 40 },
      { seatId: '3', quantity: 30 }
    ]
  },
  {
    id: '10',
    flightCode: 'FL010',
    planeId: '10',
    departureAirportId: '10',
    arrivalAirportId: '1',
    departureTime: '2025-04-10T22:00:00Z',
    arrivalTime: '2025-04-11T00:30:00Z',
    originPrice: 280,
    interAirport: [
      {
        airportId: '6',
        arrivalTime: '2025-04-10T22:00:00Z',
        departureTime: '2025-04-11T00:30:00Z',
        note: 'Nothing'
      }
    ],
    seat: [
      { seatId: '1', quantity: 50 },
      { seatId: '2', quantity: 30 },
      { seatId: '3', quantity: 20 }
    ]
  }
]
export const seatData: ISeatTable[] = [
  {
    id: '1',
    seatName: 'ECONOMY',
    seatCode: 'ECO',
    price: 100,
    description: 'Economy class with basic amenities and comfortable seating.'
  },
  {
    id: '2',
    seatName: 'BUSINESS',
    seatCode: 'BUS',
    price: 250,
    description: 'Business class with extra legroom, premium meals, and priority boarding.'
  },
  {
    id: '3',
    seatName: 'FIRST',
    seatCode: 'FIR',
    price: 500,
    description: 'First class with luxurious seating, gourmet meals, and exclusive lounge access.'
  }
]
export const cityData: ICityTable[] = [
  { id: '1', cityCode: 'CODE-1', cityName: 'Hà Nội' },
  { id: '2', cityCode: 'CODE-2', cityName: 'Hồ Chí Minh' },
  { id: '3', cityCode: 'CODE-3', cityName: 'Đà Nẵng' },
  { id: '4', cityCode: 'CODE-4', cityName: 'Hải Phòng' },
  { id: '5', cityCode: 'CODE-5', cityName: 'Cần Thơ' },
  { id: '6', cityCode: 'CODE-6', cityName: 'Nha Trang' },
  { id: '7', cityCode: 'CODE-7', cityName: 'Huế' },
  { id: '8', cityCode: 'CODE-8', cityName: 'Vũng Tàu' },
  { id: '9', cityCode: 'CODE-9', cityName: 'Đà Lạt' },
  { id: '10', cityCode: 'CODE-10', cityName: 'Quy Nhơn' }
]
export const planeData: IPlaneTable[] = [
  { id: '1', planeCode: 'VN-A861', planeName: 'Airbus A350-900', airlineId: '1' },
  { id: '2', planeCode: 'VN-A601', planeName: 'Airbus A321neo', airlineId: '2' },
  { id: '3', planeCode: 'VJ-A678', planeName: 'Airbus A320-200', airlineId: '3' },
  { id: '4', planeCode: 'QH-ACF', planeName: 'Boeing 787-9 Dreamliner', airlineId: '4' },
  { id: '5', planeCode: 'BL-F012', planeName: 'Airbus A320neo', airlineId: '5' }
]
export { }

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
