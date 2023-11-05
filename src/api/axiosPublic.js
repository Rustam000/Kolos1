import axios from "axios";
import { BASE_URL } from "../common/constants";

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
});
