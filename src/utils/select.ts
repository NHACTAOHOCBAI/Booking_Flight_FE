import { airportData, planeData, seatData } from "@/globalType"

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
export {
    planeOptions, airportOptions, seatOptions
}