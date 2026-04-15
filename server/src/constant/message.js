const message = {
  // Success
  SUCCESS: "Success",
  CREATED: "Created successfully",
  UPDATED: "Updated successfully",
  DELETED: "Deleted successfully",
  LOGIN_SUCCESS: "Login successful",
  REGISTER_SUCCESS: "Registered successfully",
  LOGOUT_SUCCESS: "Logout successful",

  // Error
  NOT_FOUND: "Not found",
  ALREADY_EXISTS: "Already exists",
  USER_ALREADY_EXISTS: "User already registered",
  PHONE_ALREADY_EXISTS: "This phone number is already in use",
  INVALID_CREDENTIALS: "Invalid credentials",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden access",
  SOMETHING_WENT_WRONG: "Something went wrong",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_TOKEN: "Invalid or expired token",

  // Validation
  REQUIRED: "Missing required fields",
  INVALID_EMAIL: "Invalid email address",
  INVALID_PASSWORD: "Password must be at least 6 characters",
  INVALID_ID: "Invalid ID",
};

module.exports = message;
