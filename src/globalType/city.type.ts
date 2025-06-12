export {}

declare global {
  interface ICityTable {
    id?: string
    cityCode: string
    cityName: string
  }
}

export interface CityList {
  result: ICityTable[]
  pagination: {
    page: number
    size: number
    page_size: number
    total: number
  }
}
