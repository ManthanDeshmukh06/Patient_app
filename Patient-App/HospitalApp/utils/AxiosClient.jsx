import axios from "axios";

// Use emulator host mapping (10.0.2.2 → localhost of your machine)
const PHONE_API_BASE = "http://10.0.2.2:5000";
const EMAIL_API_BASE = "http://10.0.2.2:5000";

export const phoneClient = axios.create({
  baseURL: PHONE_API_BASE,
  headers: { "Content-Type": "application/json" },
});

export const emailClient = axios.create({
  baseURL: EMAIL_API_BASE,
  headers: { "Content-Type": "application/json" },
});
