import axios from "axios";

export const axiosDummy = axios.create({
  baseURL: "https://jwt-authentication-beryl.vercel.app/api/",
});
