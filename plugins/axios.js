// plugins/axios.js
export default function ({ $axios, app }) {
    $axios.onRequest((config) => {
        const token = app.$cookies.get("token");
        if (token) {
            config.headers.common["Authorization"] = `Bearer ${token}`;
        }
        config.headers.common["Content-Type"] = "application/json";
        return config;
    });
}
