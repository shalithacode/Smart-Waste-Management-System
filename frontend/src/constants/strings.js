export const recycleCenters = [
  {
    id: 1,
    name: "Malabe Recycle Center",
    capacityUsed: 60, // Percentage
    materialTypes: ["Plastic", "Paper"],
    totalCapacity: 200, // Tons per day
  },
  {
    id: 2,
    name: "Kaduwela Recycle Center",
    capacityUsed: 85,
    materialTypes: ["E-waste", "Metal"],
    totalCapacity: 150,
  },
  {
    id: 3,
    name: "Pittugala Recycling Facility",
    capacityUsed: 45,
    materialTypes: ["Organic", "Plastic"],
    totalCapacity: 300,
  },
];
export const initialUser = {
  name: "",
  email: "",
  password: "",
  address: {
    street: "",
    city: "",
    postalCode: "",
  },
  role: "user", // Default role is user
};

export const wasteTypesData = [
  { type: "Plastic Waste", icon: "♻️" },
  { type: "Metal Waste", icon: "🛠️" },
  { type: "Organic Waste", icon: "🍂" },
  { type: "Paper Waste", icon: "🧾" },
  { type: "E-Waste", icon: "💻" },
  { type: "Hazardous Waste", icon: "☠️" },
];

export const pickupOptions = [
  { option: "Immediate Pickup", icon: "🚛" },
  { option: "Scheduled Pickup", icon: "🕒" },
  { option: "Flexible Pickup", icon: "🔄" },
];

export const initalContact = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export const guidelinesData = {
  "Organic Waste": [
    "Separate organic waste from recyclables.",
    "Do not mix with hazardous or electronic waste.",
    "Compost organic waste if possible.",
  ],
  "Paper Waste": [
    "Make sure the paper is clean and dry.",
    "Remove any non-paper materials like plastic or staples.",
    "Recyclable paper includes newspapers, magazines, and office paper.",
  ],
  "E-Waste": [
    "Dispose of e-waste at designated recycling centers.",
    "Do not throw electronic devices into regular bins.",
    "Ensure data is wiped from devices before disposal.",
  ],
  "Hazardous Waste": [
    "Handle hazardous waste with care and use protective gear.",
    "Dispose of hazardous waste at specialized centers.",
    "Do not mix hazardous waste with regular waste.",
  ],
  "Plastic Waste": [
    "Separate plastics by type (e.g., PET, HDPE).",
    "Remove any labels or caps from bottles.",
    "Rinse plastics before recycling.",
  ],
  "Recycle Waste": [
    "Separate materials based on their recyclability.",
    "Clean all materials before placing them in the bin.",
    "Do not include contaminated or non-recyclable items.",
  ],
  "Metal Waste": [
    "Separate ferrous (magnetic) from non-ferrous (non-magnetic) metals using a magnet.",
    "Separate metals by cleanliness.",
    "Ensure all categories are stored in clearly labeled.",
  ],
};
export const navLinks = [
  { to: "/UserHomePage", label: "🏠 Home" },
  { to: "/BulkWaste", label: "🕒 Schedule Collection" },
  { to: "/Profile", label: "🗑️ Waste Request History" },
  { to: "/notifications", label: "🔔 Notifications" },
  { to: "/membership", label: "💳 Subscription" },
];
