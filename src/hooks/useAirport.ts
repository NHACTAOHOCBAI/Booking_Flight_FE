/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAirport, deleteUser, fetchAllAirports, updateAirport } from "@/services/airportsAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllAirports = () => {
    return useQuery({
        queryKey: ["getAllAirports"],
        queryFn: fetchAllAirports
    });
};

export const useCreateAirport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createAirport,
        onSuccess: async (data, variables, context: any) => {
            await queryClient.invalidateQueries({ queryKey: ['getAllAirports'] });
            if (context?.onSuccess) context.onSuccess();
        },
    });
};

export const useUpdateAirport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (value: IUpdateAirportItem) => updateAirport(value),
        onSuccess: async (data, variables, context: any) => {
            await queryClient.invalidateQueries({ queryKey: ['getAllAirports'] });
            if (context?.onSuccess) context.onSuccess();
        },
    });
};

export const useDeleteAirport = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (value: string) => deleteUser(value),
        onSuccess: async (data, variables, context: any) => {
            await queryClient.invalidateQueries({ queryKey: ['getAllAirports'] });
            if (context?.onSuccess) context.onSuccess();
        },
    });
};
