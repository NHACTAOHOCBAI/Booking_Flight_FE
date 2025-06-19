/* eslint-disable @typescript-eslint/no-explicit-any */

import dayjs, { Dayjs } from 'dayjs'

export const validateSequentialTimes = (intermediateFlights: any[]) => {
  if (!intermediateFlights || intermediateFlights.length === 0) return true

  for (let i = 0; i < intermediateFlights.length - 1; i++) {
    const current = intermediateFlights[i]
    const next = intermediateFlights[i + 1]

    if (current.arrivalTime && next.departureTime) {
      if (dayjs(current.arrivalTime).isAfter(dayjs(next.departureTime))) {
        return false
      }
    }
  }
  return true
}

export const getIntermediateDepartureDisabledTime = (
  current: Dayjs,
  subFieldIndex: number,
  departureDate: Dayjs,
  returnDate: Dayjs,
  intermediateFlights: any[]
) => {
  if (!departureDate || !current || !returnDate) return {}

  // Thời gian tối thiểu (từ main departure hoặc previous intermediate arrival)
  let minTime = departureDate
  if (subFieldIndex > 0 && intermediateFlights[subFieldIndex - 1]?.arrivalTime) {
    const prevArrival = dayjs(intermediateFlights[subFieldIndex - 1].arrivalTime)
    minTime = prevArrival.isAfter(minTime) ? prevArrival : minTime
  }

  // Thời gian tối đa (đến main arrival hoặc next intermediate departure)
  let maxTime = returnDate
  if (subFieldIndex < intermediateFlights.length - 1 && intermediateFlights[subFieldIndex + 1]?.departureTime) {
    const nextDeparture = dayjs(intermediateFlights[subFieldIndex + 1].departureTime)
    maxTime = nextDeparture.isBefore(maxTime) ? nextDeparture : maxTime
  }

  const isSameDayAsMin = current.isSame(minTime, 'day')
  const isSameDayAsMax = current.isSame(maxTime, 'day')

  return {
    disabledHours: () => {
      const disabled: number[] = []

      if (isSameDayAsMin) {
        for (let i = 0; i < minTime.hour(); i++) disabled.push(i)
      }

      if (isSameDayAsMax) {
        for (let i = maxTime.hour() + 1; i < 24; i++) disabled.push(i)
      }

      return disabled
    },
    disabledMinutes: (selectedHour: number) => {
      const disabled: number[] = []

      if (isSameDayAsMin && selectedHour === minTime.hour()) {
        for (let i = 0; i < minTime.minute(); i++) disabled.push(i)
      }

      if (isSameDayAsMax && selectedHour === maxTime.hour()) {
        for (let i = maxTime.minute() + 1; i < 60; i++) disabled.push(i)
      }

      return disabled
    }
  }
}

export const getIntermediateArrivalDisabledTime = (
  current: Dayjs,
  subFieldIndex: number,
  returnDate: Dayjs,
  intermediateFlights: any[]
) => {
  if (!current || !returnDate) return {}

  // Thời gian tối thiểu (từ current intermediate departure)
  const currentDeparture = intermediateFlights[subFieldIndex]?.departureTime
  if (!currentDeparture) return {}

  const minTime = dayjs(currentDeparture)

  // Thời gian tối đa (đến main arrival hoặc next intermediate departure)
  let maxTime = returnDate
  if (subFieldIndex < intermediateFlights.length - 1 && intermediateFlights[subFieldIndex + 1]?.departureTime) {
    const nextDeparture = dayjs(intermediateFlights[subFieldIndex + 1].departureTime)
    maxTime = nextDeparture.isBefore(maxTime) ? nextDeparture : maxTime
  }

  const isSameDayAsMin = current.isSame(minTime, 'day')
  const isSameDayAsMax = current.isSame(maxTime, 'day')

  return {
    disabledHours: () => {
      const disabled: number[] = []

      if (isSameDayAsMin) {
        for (let i = 0; i < minTime.hour(); i++) disabled.push(i)
      }

      if (isSameDayAsMax) {
        for (let i = maxTime.hour() + 1; i < 24; i++) disabled.push(i)
      }

      return disabled
    },
    disabledMinutes: (selectedHour: number) => {
      const disabled: number[] = []

      if (isSameDayAsMin && selectedHour === minTime.hour()) {
        for (let i = 0; i < minTime.minute(); i++) disabled.push(i)
      }

      if (isSameDayAsMax && selectedHour === maxTime.hour()) {
        for (let i = maxTime.minute() + 1; i < 60; i++) disabled.push(i)
      }

      return disabled
    }
  }
}
