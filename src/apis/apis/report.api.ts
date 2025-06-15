/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "@/apis/http";
import { SuccessResponse } from "@/globalType/util.type";
interface BookingRate {
    months: {
        month: number,
        maxTickets: number,
        ticketsSold: number
    }[],
    year: number
}
const getYearDashboard = async ({ year }: { year: number }) => {
    const res = await http.get<SuccessResponse<BookingRate>>(`/dashboard/${year}`)
    return res.data.data
}
const getPoplarAirlines = async () => {
    const res = await http.get<SuccessResponse<any>>(`/airlines/flights/airline-popular`)
    return res.data.data
}
export { getYearDashboard, getPoplarAirlines }