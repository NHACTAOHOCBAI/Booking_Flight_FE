import { airlineData, airportData, cityData, planeData, seatData } from "@/globalType"

const planeOptions = planeData.map((value) => {
    return {
        value: value.id,
        label: value.planeName,
    }
})
const airportOptions = airportData.map((value) => {
    return {
        value: value.id,
        label: value.airportName,
    }
})
const seatOptions = seatData.map((value) => {
    return {
        value: value.id,
        label: value.seatName,
    }
})
const cityOptions = cityData.map((value) => {
    return {
        value: value.id,
        label: value.cityName,
    }
})
const airlineOptions = airlineData.map((value) => {
    return {
        value: value.id,
        label: value.airlineName,
    }
})
export {
    planeOptions, airportOptions, seatOptions, cityOptions, airlineOptions
}