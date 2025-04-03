import axios from '@/utils/customAxios'
const fetchAllAirports = async () => {
    const url = '/airports'
    const res = await axios.get<APIResponse<IAirportTable>>(url);
    return res.data;
};
const createAirport = async (data: IAirportTable) => {
    const url = '/airports'
    const res = await axios.post<APIResponse<IAirportTable>>(url, data);
    return res.data;
};
const updateAirport = async (data: IAirportTable) => {
    const url = '/airports'
    const res = await axios.put<APIResponse<IAirportTable>>(url, data);
    return res.data;
};
const deleteUser = async (value: string) => {
    const url = `/airports/${value}`;
    const res = await axios.delete<APIResponse<string>>(url);
    return res.data;
};
export { fetchAllAirports, createAirport, updateAirport, deleteUser }