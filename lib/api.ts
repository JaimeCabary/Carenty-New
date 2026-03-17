import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("carenty_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ── Auth endpoints ──────────────────────────────────────
export const authApi = {
  signup: (data: any) =>
    api.post("/api/auth/signup", data),

  login: (data: { email: string; password: string }) =>
    api.post("/api/auth/login", data),

  dashboard: () => api.get("/api/dashboard"),
};

export default api;
