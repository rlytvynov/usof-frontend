import axios from "axios";

const api = axios.create({
    baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_SERVER_PORT}/api/`,
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
    credentials: 'include',   
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('accessToken')
    return config
})

export default api