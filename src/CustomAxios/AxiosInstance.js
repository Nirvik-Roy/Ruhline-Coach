// axiosInstance.js
// This axiosInstance is currently not in use.. I made this for future uses.. Specially handling of Refresh TOkens...
import axios from "axios";

// create instance
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // for refresh token cookies
});

// flag + queue (for multiple 401)
let isRefreshing = false;
let failedQueue = [];

// process queued requests
const processQueue = (error) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve();
        }
    });
    failedQueue = [];
};

// response interceptor
axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        // only handle 401 + avoid infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {

            // if already refreshing → queue requests
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => resolve(axiosInstance(originalRequest)),
                        reject: (err) => reject(err),
                    });
                });
            }
            
            originalRequest._retry = true;
            isRefreshing = true;

            try {
                // 🔥 call refresh API (NO interceptor here ideally)
                const res = await axios.post(
                    "/refresh-token",
                    {},
                    { withCredentials: true }
                );

                const newAccessToken = res.data.accessToken;

                // 👉 YOU said you already handle headers manually
                // So just update it wherever you store token
                localStorage.setItem("accessToken", newAccessToken);

                processQueue(null);

                // attach new token to original request
                originalRequest.headers["Authorization"] =
                    "Bearer " + newAccessToken;

                // 🔥 retry original request silently
                return axiosInstance(originalRequest);

            } catch (refreshError) {
                processQueue(refreshError);

                // ❌ refresh failed → logout
                localStorage.removeItem("accessToken");
                window.location.href = "/login";

                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // other errors → pass normally
        return Promise.reject(error);
    }
);

export default axiosInstance;