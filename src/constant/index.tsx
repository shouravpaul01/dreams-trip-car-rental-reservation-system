import { FaLocationDot, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import { TRole } from "../type";

export const userRole:TRole={
  admin:"admin",
  user:"user"
}
export const carColorOptions = [
  { value: "white", label: "White" },
  { value: "black", label: "Black" },
  { value: "red", label: "Red" },
  { value: "blue", label: "Blue" },
  { value: "silver", label: "Silver" },
  { value: "gray", label: "Gray" },
  { value: "green", label: "Green" },
  { value: "yellow", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "brown", label: "Brown" },
  { value: "gold", label: "Gold" },
  { value: "purple", label: "Purple" },
];

export const seatOptions =[
  { "value": 2, "label": "2 Seats" },
  { "value": 4, "label": "4 Seats" },
  { "value": 5, "label": "5 Seats" },
  { "value": 7, "label": "7 Seats" },
  { "value": 8, "label": "8 Seats" },
  { "value": 9, "label": "9 Seats" },
  { "value": 12, "label": "12 Seats" },
  { "value": 15, "label": "15 Seats" }
]
export const bagCapabilityOptions=[
  { "value": 1, "label": "1 Bag" },
  { "value": 2, "label": "2 Bags" },
  { "value": 3, "label": "3 Bags" },
  { "value": 4, "label": "4 Bags" },
  { "value": 5, "label": "5 Bags" },
  { "value": 6, "label": "6 Bags" },
  { "value": "10+", "label": "10+ Bags" }
]

export const fuelOptions=[
  { "value": "petrol", "label": "Petrol" },
  { "value": "diesel", "label": "Diesel" },
  { "value": "electric", "label": "Electric" },
  { "value": "hybrid", "label": "Hybrid" },
  { "value": "cng", "label": "CNG" },
  { "value": "lpg", "label": "LPG" },
  { "value": "petrol-diesel", "label": "Petrol & Diesel" },
  { "value": "petrol-electric", "label": "Petrol & Electric" },
  { "value": "diesel-electric", "label": "Diesel & Electric" }
]
export const transmissionOptions=[
  { "value": "automatic", "label": "Automatic" },
  { "value": "manual", "label": "Manual" },
  { "value": "semi-automatic", "label": "Semi-Automatic" }
]
export const airConditioningOptions=[
  { "value": "Yes", "label": "Yes" },
  { "value": "No", "label": "No" },
]
export const drivingOptions=[
  { "value": "Self Driving", "label": "Self Driving" },
  { "value": "Company Provided", "label": "Company Provided" },
]
export const carFeatureOptions = [
  { value: "Sunroof", label: "Sunroof" },
  { value: "Leather Seats", label: "Leather Seats" },
  { value: "Bluetooth", label: "Bluetooth" },
  { value: "Backup Camera", label: "Backup Camera" },
  { value: "Navigation System", label: "Navigation System" },
  { value: "Heated Seats", label: "Heated Seats" },
  { value: "Keyless Entry", label: "Keyless Entry" },
  { value: "Blind Spot Monitor", label: "Blind Spot Monitor" },
  { value: "Cruise Control", label: "Cruise Control" },
  { value: "Parking Sensors", label: "Parking Sensors" },
  { value: "Lane Departure Warning", label: "Lane Departure Warning" },
  { value: "Adaptive Headlights", label: "Adaptive Headlights" },
  { value: "Remote Start", label: "Remote Start" },
  { value: "Apple CarPlay", label: "Apple CarPlay" },
  { value: "Android Auto", label: "Android Auto" },
  {
    value: "Automatic Emergency Braking",
    label: "Automatic Emergency Braking",
  },
  { value: "All-Wheel Drive", label: "All-Wheel Drive" },
  { value: "Premium Audio", label: "Premium Audio" },
  { value: "Tinted Windows", label: "Tinted Windows" },
  { value: "Third-Row Seating", label: "Third-Row Seating" },
];
export const sortByOptions = [
  { value: "Low to High", label: "Low to High" },
  { value: "High to Low", label: "High to Low" },
];

export const selectCustomStype={
  control: (provided:any, state:any) => ({
    ...provided,
    padding: "5px",
    boxShadow: "none",
    border: state.isFocused
      ? "1px solid #D7DDE4"
      : provided.border,
    outline: state.isFocused ? "2px solid #D7DDE4" : "none",
    outlineOffset: state.isFocused ? "2px" : "",
    borderRadius: "10px",
    "&:hover": {
      border: state.isFocused ? "1px solid #D7DDE4" : provided.border,
    },
  }),
}
export const locationOptions = [
  { value: "Cox's Bazar Airport", label: "Cox's Bazar Airport" },
  { value: "Kolatoli Beach", label: "Kolatoli Beach" },
  { value: "Laboni Beach", label: "Laboni Beach" },
  { value: "Himchari", label: "Himchari" },
  { value: "Inani Beach", label: "Inani Beach" },
  { value: "Radiant Fish World", label: "Radiant Fish World" },
  { value: "Marine Drive Road", label: "Marine Drive Road" },
  { value: "Rhimar Kata", label: "Rhimar Kata" },
  { value: "Dolphin Circle", label: "Dolphin Circle" },
  { value: "Cox's Bazar Eco Park", label: "Cox's Bazar Eco Park" },
  { value: "Cox's Bazar Railway Station", label: "Cox's Bazar Railway Station"},
  { value: "Teknaf", label: "Teknaf" },
  { value: "Cox's Bazar Central Bus Terminal", label: "Cox's Bazar Central Bus Terminal" },
  { value: "Cox's Bazar Safari Park", label: "Cox's Bazar Safari Park" },
  { value: "Ramu Buddhist Temple", label: "Ramu Buddhist Temple" },
  { value: "Pebble Stone Beach", label: "Pebble Stone Beach" },
  { value: "Dulahazra Safari Park", label: "Dulahazra Safari Park" },
  { value: "Laldighi", label: "Laldighi" },
  { value: "Sughandha Point", label: "Sughandha Point" },
  { value: "Bakkhali River", label: "Bakkhali River" },
  { value: "Khurushkul Bridge", label: "Khurushkul Bridge" },
  { value: "Rakhine Village", label: "Rakhine Village" },

  // Hotels
  { value: "Sayeman Beach Resort", label: "Sayeman Beach Resort" },
  { value: "Long Beach Hotel", label: "Long Beach Hotel" },
  { value: "Royal Tulip Sea Pearl Beach Resort", label: "Royal Tulip Sea Pearl Beach Resort" },
  { value: "Ocean Paradise Hotel & Resort", label: "Ocean Paradise Hotel & Resort" },
  { value: "Hotel The Cox Today", label: "Hotel The Cox Today" },
  { value: "Seagull Hotel", label: "Seagull Hotel" },
  { value: "Lighthouse Family Retreat", label: "Lighthouse Family Retreat" },
  { value: "Hotel Sea Crown", label: "Hotel Sea Crown" },
  { value: "Hotel Ocean Palace", label: "Hotel Ocean Palace" },
];

export const teamInformations = [
  {
    image:
      "https://res.cloudinary.com/dcrui4h7s/image/upload/v1726161621/dreams-trip-car-rental-reservation-system/o9ogwuhoadptb1kidzzd.webp",
    name: "Mr. Shourav Paul",
    designation: "CEO",
  },
  {
    image:
      "https://res.cloudinary.com/dcrui4h7s/image/upload/v1726175059/dreams-trip-car-rental-reservation-system/o5uwmcmian2fuhxlrilg.jpg",
    name: "Radika Sen",
    designation: "COO",
  },
  {
    image:
      "https://res.cloudinary.com/dcrui4h7s/image/upload/v1726175236/dreams-trip-car-rental-reservation-system/ecfa1j6ncy2k5pzzkrmg.jpg",
    name: "Mr. Hasan Ulahh",
    designation: "CFO",
  },
];

export const contactInfo = [
  {
    icon: <FaPhone />,
    title: "Phone",
    subTitle: "+880123456789",
  },
  {
    icon: <FaRegEnvelope />,
    title: "Email",
    subTitle: "info@dreamscoxstrip.com",
  },
  {
    icon: <FaLocationDot />,
    title: "Location",
    subTitle: "Cox's Bazar, Bangladesh",
  },
];
