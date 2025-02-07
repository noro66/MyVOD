import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL, getAuthHeaders } from "../constants/auth";

export async function login({ email, password }) {
  try {
    const response = await axios.post(`${API_URL}api/auth/login`, {
      email,
      password,
    });

    if (response.status !== 200 || !response.data.accessToken) {
      throw new Error("Invalid credentials ❌");
    }
    await AsyncStorage.setItem("accessToken", response.data.accessToken);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed ❌");
  }
}

export async function getCurrentUser() {
  try {
    const response = await axios.get(
      `${API_URL}api/auth/current-user`,
      getAuthHeaders()
    );

    if (response.data && response.data.message) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
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
    console.error(error);
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
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("User could not be deleted");
  }
}
