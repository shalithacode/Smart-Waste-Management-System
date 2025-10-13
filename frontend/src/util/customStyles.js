// Inline style for light white grid background
export const gridBackgroundStyle = {
  backgroundImage: `
    linear-gradient(90deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px),
    linear-gradient(180deg, rgba(0, 0, 0, 0.02) 1px, transparent 1px)
  `,
  backgroundSize: "10px 10px", // Smaller grid size
  width: "100%",
  minHeight: "100vh", // Full-screen grid background
};
export const getStatusColor = (status) => {
  let color;
  switch (status) {
    case "pending":
      color = "gray";
      break;
    case "assigned":
      color = "yellow";
      break;
    case "picked-up":
      color = "green";
      break;
    default:
      color = "red"; // fallback color
  }
  return color;
};
