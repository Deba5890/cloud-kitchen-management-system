import axios from "axios";

const API = axios.create({
  baseURL: "https://cloud-kitchen-backend-mpta.onrender.com",
});

export default API;