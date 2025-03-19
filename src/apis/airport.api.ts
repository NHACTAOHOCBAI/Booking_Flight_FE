import http from "@/utils/http";

export const getAirPort = async () => {
  const response = await http.get("airports", {});
  return response.data;
};
