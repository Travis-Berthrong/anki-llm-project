import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const axios_instance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default axios_instance;