import axios from "axios";
const Services = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // timeout: 10000,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${
      document.cookie ? document.cookie.replace("SAID=", "") : null
    }`,
  },
});

export default Services;
