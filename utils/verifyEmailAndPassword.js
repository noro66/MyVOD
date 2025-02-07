const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

function validateCredentials(email, password) {
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format ❌");
  }
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character ❌"
    );
  }
}

function validateSignIn(email, password) {
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email format ❌");
  }
  if (!password.trim()) {
    throw new Error("Password cannot be empty ❌");
  }
}

export { validateCredentials, validateSignIn };
