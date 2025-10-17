// Application-wide enums for consistency

export const Roles = Object.freeze({
  USER: "user",
  ADMIN: "admin",
  DRIVER: "driver",
});

export const WasteStatus = Object.freeze({
  PENDING: "pending",
  ASSIGNED: "assigned",
  PICKED_UP: "picked-up",
  REJECTED: "rejected",
});

export const PickupOptions = Object.freeze({
  IMMEDIATE: "Immediate Pickup",
  SCHEDULED: "Scheduled Pickup",
  FLEXIBLE: "Flexible Pickup",
});

export const WasteTypes = Object.freeze([
  "Organic Waste",
  "Paper Waste",
  "E-Waste",
  "Hazardous Waste",
  "Plastic Waste",
  "Recycle Waste",
  "Metal Waste",
]);

export const NotificationTypes = Object.freeze({
  INFO: "info",
  WARN: "warn",
});

export const NotificationStatus = Object.freeze({
  READ: "read",
  UNREAD: "unread",
});
