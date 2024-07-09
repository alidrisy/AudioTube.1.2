import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.43.39:5000/api/v1",
});
