import axios from "axios";

const jwtBlackList = {
    '/member/signup' : false,
    '/member/login' : false
}
const axiosJwtInterceptor = axios.create()

axiosJwtInterceptor.interceptors.request.use(
    (request) => {
        if (!jwtBlackList[request.url]) {
            request.headers['Authorization'] = localStorage.getItem('jwtToken')
        }
        return request
    }
)

export default axiosJwtInterceptor