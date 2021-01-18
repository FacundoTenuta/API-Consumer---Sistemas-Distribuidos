import axios from "axios";

export default axios.create({
  baseURL: "http://100.27.26.154/",
  headers: {
    "Content-type": "application/json"
  }
});