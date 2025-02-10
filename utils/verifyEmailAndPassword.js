import { Alert } from "react-native";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

function validateCredentials(email, password) {
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid email format ❌");
  }
  if (!passwordRegex.test(password)) {
    Alert.alert(
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character ❌"
    );
  }
}

function validateSignIn(email, password) {
  if (!emailRegex.test(email)) {
    Alert.alert("Invalid email format ❌");
  }
  if (!password.trim()) {
    Alert.alert("Password cannot be empty ❌");
  }
}

export { validateCredentials, validateSignIn };
