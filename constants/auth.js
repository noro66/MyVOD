import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_URL = "http://192.168.9.153:3000/";

export const getAuthHeaders = () => {
  const token = AsyncStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
