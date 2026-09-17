import axios from "axios";

// Hostinger blocks real PUT/PATCH; Laravel accepts POST + _method spoofing.
axios.interceptors.request.use((config) => {
    const method = (config.method || "").toLowerCase();
    if (method !== "put" && method !== "patch") {
        return config;
    }

    const originalMethod = method.toUpperCase();
    config.method = "post";

    if (config.data instanceof FormData) {
        config.data.append("_method", originalMethod);
    } else if (config.data && typeof config.data === "object") {
        config.data = { ...config.data, _method: originalMethod };
    } else {
        config.data = { _method: originalMethod };
    }

    return config;
});
