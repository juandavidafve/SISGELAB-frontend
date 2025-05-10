import axios from "axios";

import { BACKEND_BASE_URL } from "./config";

export const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
