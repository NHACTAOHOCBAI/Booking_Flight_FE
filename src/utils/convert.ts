import { airlineData, airportData, cityData, flightData, planeData, seatData } from '@/globalType'

const toSeat = (seatId: string): ISeatTable => {
  const result = seatData.filter((value) => seatId === value.id)
  if (result.length == 0) {
    return {
      id: '',
      seatName: '',
      seatCode: '',
      price: 0,
      description: ''
    }
  }
  return result[0]
}
const toAirport = (airportId: string): IAirportTable => {
  const result = airportData.filter((value) => airportId === value.id)
  if (result.length == 0) {
    return {
      id: '',
      airportCode: '',
      airportName: '',
      cityCode: ''
    }
  }
  return result[0]
}
const toCity = (cityId: string): ICityTable => {
  const result = cityData.filter((value) => cityId === value.id)
  if (result.length == 0) {
    return {
      id: '',
      cityCode: '',
      cityName: ''
    }
  }
  return result[0]
}
const toPlane = (planeName: string): IPlaneTable => {
  const result = planeData.filter((value) => planeName === value.id)
  if (result.length == 0) {
    return {
      id: '',
      planeCode: '',
      planeName: '',
      airlineId: ''
    }
  }
  return result[0]
}
const toFLight = (flightId: string): IFlightTable => {
  const result = flightData.filter((value) => flightId === value.id)
  if (result.length == 0) {
    return {
      id: '',
      flightCode: '',
      planeId: '',
      planeName: '',
      departureAirportId: '',
      departureAirportName: '',
      arrivalAirportId: '',
      arrivalAirportName: '',
      departureTime: '',
      arrivalTime: '',
      originPrice: 0,
      listFlight_Airport: [],
      seat: []
    }
  }
  return result[0]
}
const toAirline = (airlineId: string): IAirlineTable => {
  const result = airlineData.filter((value) => airlineId === value.id)
  if (result.length == 0) {
    return {
      id: '',
      airlineCode: '',
      airlineName: ''
    }
  }
  return result[0]
}
export { toAirport, toCity, toPlane, toSeat, toFLight, toAirline }
