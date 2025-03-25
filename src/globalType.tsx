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
        airportId: '2',
        arrivalTime: '2025-04-01T08:00:00Z',
        departureTime: '2025-04-01T10:30:00Z',
        note: 'Unfortunately, there are some problem with my plane, so we have to stop by nearly airport to take off. I hope you will understand for us'
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
    interAirport: [],
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
    seatCode: 'ECONOMY',
    price: 100,
    description: 'Economy class with basic amenities and comfortable seating.'
  },
  {
    id: '2',
    seatCode: 'BUSINESS',
    price: 250,
    description: 'Business class with extra legroom, premium meals, and priority boarding.'
  },
  {
    id: '3',
    seatCode: 'FIRST',
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
  {
    id: '1',
    planeCode: 'VN123',
    planeName: 'Máy bay Airbus A321',
    airlineId: 'VNA'
  },
  {
    id: '2',
    planeCode: 'VN456',
    planeName: 'Máy bay Boeing 787 Dreamliner',
    airlineId: 'VNA'
  },
  {
    id: '3',
    planeCode: 'BL789',
    planeName: 'Máy bay Airbus A350 XWB',
    airlineId: 'BAM'
  },
  {
    id: '4',
    planeCode: 'VJ012',
    planeName: 'Máy bay ATR 72-600',
    airlineId: 'VJC'
  },
  {
    id: '5',
    planeCode: 'QH345',
    planeName: 'Máy bay Embraer E190',
    airlineId: 'QH'
  },
  {
    id: '6',
    planeCode: 'VN678',
    planeName: 'Máy bay Airbus A330',
    airlineId: 'VNA'
  },
  {
    id: '7',
    planeCode: 'BL901',
    planeName: 'Máy bay Boeing 777-300ER',
    airlineId: 'BAM'
  },
  {
    id: '8',
    planeCode: 'VJ234',
    planeName: 'Máy bay Airbus A320neo',
    airlineId: 'VJC'
  },
  {
    id: '9',
    planeCode: 'QH567',
    planeName: 'Máy bay Boeing 737 MAX',
    airlineId: 'QH'
  },
  {
    id: '10',
    planeCode: 'VN890',
    planeName: 'Máy bay Airbus A380',
    airlineId: 'VNA'
  }
]

export const accountData: IAccountTable[] = [
  {
    id: '1',
    username: 'nguyenvanA',
    password: 'Matkhau@123',
    email: 'nguyenvana@gmail.com',
    fullName: 'Nguyễn Văn A',
    phone: '0912345678',
    role: 1
  },
  {
    id: '2',
    username: 'tranthiB',
    password: 'Thi@456789',
    email: 'tranthib@gmail.com',
    fullName: 'Trần Thị B',
    phone: '0987654321',
    role: 2
  },
  {
    id: '3',
    username: 'lehoangC',
    password: 'Hoang#7890',
    email: 'lehoangc@gmail.com',
    fullName: 'Lê Hoàng C',
    phone: '0909123456',
    role: 1
  },
  {
    id: '4',
    username: 'phamthuyD',
    password: 'ThuyD@1234',
    email: 'phamthuyd@gmail.com',
    fullName: 'Phạm Thùy D',
    phone: '0978123456',
    role: 3
  },
  {
    id: '5',
    username: 'vuvantaiE',
    password: 'VuvanTai@99',
    email: 'vuvantai@gmail.com',
    fullName: 'Vũ Văn Tài',
    phone: '0911223344',
    role: 2
  },
  {
    id: '6',
    username: 'dangthuyF',
    password: 'F@12345678',
    email: 'dangthuyf@gmail.com',
    fullName: 'Đặng Thúy F',
    phone: '0988776655',
    role: 1
  },
  {
    id: '7',
    username: 'buiquangG',
    password: 'QuangG!123',
    email: 'buiquangg@gmail.com',
    fullName: 'Bùi Quang G',
    phone: '0901122334',
    role: 3
  },
  {
    id: '8',
    username: 'hoangthuH',
    password: 'ThuH@2023',
    email: 'hoangthuh@gmail.com',
    fullName: 'Hoàng Thu H',
    phone: '0912345000',
    role: 2
  },
  {
    id: '9',
    username: 'lyvanK',
    password: 'VanK#9999',
    email: 'lyvank@gmail.com',
    fullName: 'Lý Văn K',
    phone: '0988999888',
    role: 1
  },
  {
    id: '10',
    username: 'maithiL',
    password: 'MaiL@12345',
    email: 'maithil@gmail.com',
    fullName: 'Mai Thị L',
    phone: '0900111222',
    role: 2
  }
]

export const ticketData: ITicketTable[] = [
  {
    id: '1',
    flightId: 'VN123',
    seatId: 'A1',
    passengerName: 'Nguyễn Văn An',
    passengerPhone: '0912345678',
    passengerIDCard: '123456789',
    passengerEmail: 'nguyenvana@gmail.com'
  },
  {
    id: '2',
    flightId: 'VN456',
    seatId: 'B3',
    passengerName: 'Trần Thị Bình',
    passengerPhone: '0987654321',
    passengerIDCard: '987654321',
    passengerEmail: 'tranthib@gmail.com'
  },
  {
    id: '3',
    flightId: 'BL789',
    seatId: 'C5',
    passengerName: 'Lê Hoàng Cường',
    passengerPhone: '0909123456',
    passengerIDCard: '456123789',
    passengerEmail: 'lehoangc@gmail.com'
  },
  {
    id: '4',
    flightId: 'VJ012',
    seatId: 'D7',
    passengerName: 'Phạm Thùy Dung',
    passengerPhone: '0978123456',
    passengerIDCard: '321654987',
    passengerEmail: 'phamthuyd@gmail.com'
  },
  {
    id: '5',
    flightId: 'QH345',
    seatId: 'E9',
    passengerName: 'Vũ Văn Tài',
    passengerPhone: '0911223344',
    passengerIDCard: '654987321',
    passengerEmail: 'vuvantai@gmail.com'
  },
  {
    id: '6',
    flightId: 'VN678',
    seatId: 'F2',
    passengerName: 'Đặng Thúy Hằng',
    passengerPhone: '0988776655',
    passengerIDCard: '789456123',
    passengerEmail: 'dangthuyh@gmail.com'
  },
  {
    id: '7',
    flightId: 'BL901',
    seatId: 'G4',
    passengerName: 'Bùi Quang Huy',
    passengerPhone: '0901122334',
    passengerIDCard: '147258369',
    passengerEmail: 'buiquangh@gmail.com'
  },
  {
    id: '8',
    flightId: 'VJ234',
    seatId: 'H6',
    passengerName: 'Hoàng Thu Hiền',
    passengerPhone: '0912345000',
    passengerIDCard: '369258147',
    passengerEmail: 'hoangthuh@gmail.com'
  },
  {
    id: '9',
    flightId: 'QH567',
    seatId: 'K8',
    passengerName: 'Lý Văn Khánh',
    passengerPhone: '0988999888',
    passengerIDCard: '258147369',
    passengerEmail: 'lyvank@gmail.com'
  },
  {
    id: '10',
    flightId: 'VN890',
    seatId: 'L10',
    passengerName: 'Mai Thị Linh',
    passengerPhone: '0900111222',
    passengerIDCard: '951753824',
    passengerEmail: 'maithil@gmail.com'
  }
]

export const airlines: IAirlineTable[] = [
  { id: '1', airlineCode: 'VNA', airlineName: 'Vietnam Airlines' },
  { id: '2', airlineCode: 'VJ', airlineName: 'VietJet Air' },
  { id: '3', airlineCode: 'BBA', airlineName: 'Bamboo Airways' },
  { id: '4', airlineCode: 'HVN', airlineName: 'Hãng hàng không Hải Vân' },
  { id: '5', airlineCode: 'VPA', airlineName: 'Vasco Airlines' },
  { id: '6', airlineCode: 'DDA', airlineName: 'Đông Dương Airlines' },
  { id: '7', airlineCode: 'SKY', airlineName: 'Sky Airlines Việt Nam' },
  { id: '8', airlineCode: 'TNA', airlineName: 'Thanh Nam Airlines' },
  { id: '9', airlineCode: 'SAO', airlineName: 'Sao Việt Airlines' },
  { id: '10', airlineCode: 'MKA', airlineName: 'Mekong Airlines' }
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
