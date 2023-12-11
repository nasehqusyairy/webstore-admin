import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "http://192.168.117.138:8000/api",
});