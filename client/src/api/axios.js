import axios from 'axios'

//创建axios示例
let service = axios.create({
    timeout: 60000
})


//设置请求拦截器
service.interceptors.request.use(
    (config) => {
        let url = config.url.split('/')
        if(url[url.length] != 'login'){
            config.headers.common['Authorization'] = localStorage.getItem('Token')
        }
        return config
    },
    (error) => {
        //请求错误处理
        return Promise.reject(error)
    }
)

//设置响应拦截器




//导出
export default function () {
    return service
}