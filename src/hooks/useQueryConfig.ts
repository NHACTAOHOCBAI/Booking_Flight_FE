import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import useQueryParams from './useQueryParams'
import { ListConfig } from '@/globalType/listConfig.type'

export type QueryConfig = {
  [key in keyof ListConfig]: string
}

export default function useQueryConfig() {
  const queryParams: QueryConfig = useQueryParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.size || '20',
      'arrivalAirport.city.cityName': queryParams['arrivalAirport.city.cityName'],
      'departureAirport.city.cityName': queryParams['departureAirport.city.cityName'],
      departureTime: queryParams.departureTime,
      tripType: queryParams.tripType,
      returnTime: queryParams.returnTime,
      passengerNumber: queryParams.passengerNumber,
      sort_by: queryParams.sort_by,
      name: queryParams.name,
      order: queryParams.order
    },
    isUndefined
  )
  return queryConfig
}
