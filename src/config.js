// src/config.js
const config = {
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  Razor_Pay:import.meta.env.VITE_RAZORPAY_KEY_ID
};

export default config;

