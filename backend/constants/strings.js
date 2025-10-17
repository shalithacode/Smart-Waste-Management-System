// Centralized text messages to ensure consistency and easy localization

export const Messages = {
  AUTH: {
    INVALID_TOKEN: "Invalid token.",
    NO_TOKEN: "No token provided.",
    ADMIN_ONLY: "Admin access required.",
    DRIVER_ONLY: "Driver access required.",
  },
  USER: {
    NOT_FOUND: "User not found.",
    REGISTER_SUCCESS: "User registered successfully.",
    INVALID_CREDENTIALS: "Invalid credentials.",
  },
  WASTE: {
    LOCATION_REQUIRED: "Valid location (latitude, longitude) is required.",
    CREATED: "Waste request created successfully.",
    ASSIGNED: "Waste request assigned to a driver.",
    REJECTED: "Waste request rejected.",
    PICKED_UP: "Waste has been picked up.",
  },
  NOTIFICATION: {
    INVALID_STATUS: "Invalid notification status value.",
    NOT_FOUND: "Notification not found.",
  },
  SYSTEM: {
    SERVER_ERROR: "Internal server error.",
  },
};
