import axios from "axios";

const server = axios.create({
  baseURL: "http://162.14.73.22:3333/",
});

export const getApiList = () => server.get("/api/list").then((res) => res.data);
