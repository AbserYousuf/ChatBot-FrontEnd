
import axios from "axios"

const refresh = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true
})

/* -------- REQUEST INTERCEPTOR (Attach Token) -------- */

refresh.interceptors.request.use((config) => {

  const token = localStorage.getItem("LoginToken")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

/* -------- RESPONSE INTERCEPTOR (Refresh Token) -------- */

refresh.interceptors.response.use(
  (res) => res,
  async (error) => {

    const originalRequest = error.config

    if (error.response?.status === 403 && !originalRequest._retry) {

      originalRequest._retry = true

      try {

        await refresh.post("/auth/refresh")

        return refresh(originalRequest)

      } catch (err) {

        localStorage.removeItem("LoginToken")
        window.location.href = "/login"

        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default refresh

