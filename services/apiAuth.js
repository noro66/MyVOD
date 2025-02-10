import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL, getAuthHeaders } from "../constants/auth";

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${API_URL}api/auth/login`, {
      email,
      password,
    });
    await AsyncStorage.setItem("accessToken", response.data.accessToken);
    console.log("data: ", response?.data);
    AsyncStorage.setItem("accessToken", response?.data?.token);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed ❌");
  }
}

export async function getCurrentUser() {
  try {
    const headers = await getAuthHeaders(); 
    const response = await axios.get(`${API_URL}api/auth/me`, headers);
    console.log(response?.data);

    return response?.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function getUsers(keyword = "") {
  try {
    const response = await axios.get(API_URL + "api", {
      params: { keyword },
      ...getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error("Users could not be loaded");
  }
}

// Create or update a user
export async function createUser(newUser) {
  try {
    let response = await axios.post(
      API_URL + "api/auth/register",
      newUser,
      getAuthHeaders()
    );
    console.log("data: ", response?.data);
    AsyncStorage.setItem("accessToken", response?.data?.token);

    return response;
  } catch (error) {
    const errorMessage = error.response?.data?.message;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}

// Delete a user
export async function deleteUser(id) {
  try {
    const response = await axios.delete(
      `${API_URL}api/auth/${id}`,
      getAuthHeaders()
    );
    return response?.data;
  } catch (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
}
