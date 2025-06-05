export interface ListConfig {
  page?: number | string
  size?: number | string
  tripType?: string
  returnTime?: string
  passengerNumber?: number
  'departureAirport.city.cityName'?: string
  'arrivalAirport.city.cityName'?: string
  departureTime?: string
  sort_by?: 'createdAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}
