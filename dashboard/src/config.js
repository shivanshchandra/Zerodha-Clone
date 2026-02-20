const API_BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:3002"
    : "https://zerodha-clone-vtke.onrender.com";

export default API_BASE_URL;