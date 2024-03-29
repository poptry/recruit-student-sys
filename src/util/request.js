import axios from "axios";
import Cookies from "js-cookie";
const http = axios.create({
    //通用请求地址，请求前缀
    baseURL: '/api',
    timeout: 20000,//10秒超时
})
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = Cookies.get('token')
    config.headers.token = token ? token : 0
    return config;
}, function (error) {

    return Promise.reject(error);
});



// 添加响应拦截器
http.interceptors.response.use(function (response) {

    return response;
}, function (error) {

    return Promise.reject(error);
});
export default http