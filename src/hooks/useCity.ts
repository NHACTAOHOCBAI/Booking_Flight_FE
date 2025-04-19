import cityApi from "@/apis/city.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetAllCites = () => {
    return useQuery({
        queryKey: ['cities'],
        queryFn: cityApi.getCities,
    })
}
export const useCreateCity = () => {
    return useMutation({
        mutationFn: cityApi.createCity,
    })
}
