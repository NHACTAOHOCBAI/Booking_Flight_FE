import http from "@/utils/http";

export const getFlight = async () => {
  const response = http.get("flights", {});
  return (await response).data;
};
