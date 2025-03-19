import http from "@/utils/http";

export const getAccounts = async () => {
  const response = await http.get("accounts", {});
  return response.data;
};
