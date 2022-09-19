import axios from "axios"

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000'
})

axiosClient.interceptors.request.use((requestConfig) => {
    const accessToken = localStorage.getItem('access_token');
    console.log(accessToken);
    if (accessToken) {
        requestConfig.headers["Authorization"] = "Bearer " + accessToken
    }
    return requestConfig
}, (error) => {
    return Promise.reject(error.message);
});

axiosClient.interceptors.response.use((res) => {
    return res;
}, async (err) => {
    const originalConfig = err.config;
    const statusCode = err.response.status;
    if (statusCode === 401 && originalConfig.url === '/auth/token') {
        console.log("Hello");
        return Promise.reject(err.message);
    }
    if (statusCode === 401) {
        console.log("Hello Again")
        const tokenResponse = await axiosClient.post('auth/token', {
            token: localStorage.getItem('refresh_token')
        })
        console.log(tokenResponse)
        console.log(tokenResponse.data.accessToken);
        localStorage.setItem('access_token', tokenResponse.data.accessToken)
        return axiosClient(originalConfig)
    }
    return Promise.reject(err.message)
})

export default axiosClient