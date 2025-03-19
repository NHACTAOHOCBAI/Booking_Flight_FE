import axios from '@/utils/customAxios'
const fetchAllAirports = async () => {
    const url = '/airports'
    const res = await axios.get<APIResponse<IFakeAirportItem>>(url);
    return res.data;
};
const createAirport = async (value: INewAirportItem) => {
    const data = {
        airportName: value.name,
        location: value.country
    }
    const url = '/airports'
    const res = await axios.post<APIResponse<IFakeAirportItem>>(url, data);
    return res.data;
};
const updateAirport = async (value: IUpdateAirportItem) => {
    const url = `/airports/${value._id}`;
    const data = {
        airportName: value.name,
        location: value.country
    }
    const res = await axios.put<APIResponse<IFakeAirportItem>>(url, data);
    return res.data;
};
const deleteUser = async (value: string) => {
    const url = `/airports/${value}`;
    const res = await axios.delete<APIResponse<string>>(url);
    return res.data;
};
export { fetchAllAirports, createAirport, updateAirport, deleteUser }
// // Tạo user mới
//  const createUser = async (user) => {
//     const { data } = await axios.post(API_URL, user);
//     return data;
// };

// // Cập nhật user
//  const updateUser = async ({ id, user }) => {
//     const { data } = await axios.put(`${API_URL}/${id}`, user);
//     return data;
// };

// // Xóa user
//  const deleteUser = async (id) => {
//     await axios.delete(`${API_URL}/${id}`);
// };