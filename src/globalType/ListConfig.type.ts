export interface ListConfig {
  page?: number | string
  size?: number | string
  tripType?: string
  returnTime?: string
  passengerNumber?: number
  'departureAirport.city.cityName'?: string
  'arrivalAirport.city.cityName'?: string
  departureTime?: string
  filter?: string
}
