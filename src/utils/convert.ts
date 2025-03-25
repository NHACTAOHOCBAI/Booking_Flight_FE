import { airportData, cityData, planeData, seatData } from "@/globalType"

const toSeat = (seatId: string): ISeatTable => {
    const result = seatData.filter((value) => seatId === value.id);
    if (result.length == 0) {
        return {
            id: "",
            seatName: "",
            seatCode: "",
            price: 0,
            description: "",
        }
    }
    return result[0];
}
const toAirport = (airportId: string): IAirportTable => {
    const result = airportData.filter((value) => airportId === value.id);
    if (result.length == 0) {
        return {
            id: "",
            airportCode: "",
            airportName: "",
            cityId: ""
        }
    }
    return result[0];
}
const toCity = (cityId: string): ICityTable => {
    const result = cityData.filter((value) => cityId === value.id);
    if (result.length == 0) {
        return {
            id: "",
            cityCode: "",
            cityName: "",
        }
    }
    return result[0];
}
const toPlane = (planeId: string): IPlaneTable => {
    const result = planeData.filter((value) => planeId === value.id);
    if (result.length == 0) {
        return {
            id: "",
            planeCode: "",
            planeName: "",
            airlineId: "",
        }
    }
    return result[0];
}
export { toAirport, toCity, toPlane, toSeat }