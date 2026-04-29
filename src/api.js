import axios from 'axios'

const API_BASE_URL = "http://gulayan-server.test/api";

export const api = axios.create({
   baseURL: API_BASE_URL,
   withCredentials: true, // set to false kung hindi gagamit ng cookies
   headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
   },
   timeout: 20000
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization =  `Bearer ${token}`
    }
    return config;
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error?.response;
    const message = data?.message ?? "Error encountered.";

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.replace("/login");
    }
    return Promise.reject({  ...error, message, status});
  }
)

// Plants API
export const plantsApi = {
  getAll: () => api.get("/plants"),
  getById: (id) => api.get(`/plants/${id}`),
  create: (data) => api.post("/plants", data),
  update: (id, data) => api.put(`/plants/${id}`, data),
  delete: (id) => api.delete(`/plants/${id}`),
}

