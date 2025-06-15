import { getYearDashboard } from "@/apis/apis/report.api";
import { useQuery } from "@tanstack/react-query";

export const useGetYearDashboard = (year: number) => {
    return useQuery({
        queryKey: ["get year dashboard", year],
        queryFn: () => getYearDashboard({ year }),
    });
};