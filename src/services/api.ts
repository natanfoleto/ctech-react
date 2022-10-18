import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3334",
  headers: {
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("token") as string
    )}`,
  },
});

api.defaults.validateStatus = (status) => {
  if (status !== 500) return true;

  return false;
};

export default api;
