import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui';
import * as types from '@/store/types'
class AxiosRequset {
    constructor() {
        // 请求地址
        this.baseURL = this.setURLWithEnv();
        // 超时时间
        this.timeout = 10000;
        // 请求队列
        this.requestQueue = {};
        this.validateStatus = status => {
            // 自定义响应成功的HTTP状态码
            return /^(2|3)\d{2}$/.test(status);
        };
    }
    // 针对不同的环境设置不同的请求地址
    setURLWithEnv() {
        switch (process.env.NODE_ENV) {
            case 'developement':
                return '/';
            case 'production':
                return 'https://api.production.xxx/api';
            case 'test':
                return 'https://api.test.xxx/api';
        }
    }
    /**
     * 设置拦截器
     * @param {any} instance axios实例
     * @param {string} url 请求地址
     */
    setInterceptor(instance, url) {
        // 设置请求拦截器
        instance.request.interceptor.use(config => {
            // 每次请求前 将token 放到请求中
            const token = localStorage.getItem('token');
            token && (config.headers.Authorization = token);
            // 给每个请求生成一个请求令牌
            let Cancel = axios.CancelToken;
            config.cancelToken = new Cancel(function (c) {
                // 存储请求令牌
                store.commit(types.PUSH_REQUEST, c);
            });
            // 如果请求队列为空时，第一次的请求增加请求loading
            if (Object.keys(this.requestQueue).length === 0) {
                this.loading = Message.info({
                    message: "正在加载中...",
                    duration: 0,
                    iconClass: 'el-icon-loading'
                })
            }
            // 设置当前请求在请求队列中的key值，用以在响应完成之后从队列中删除该请求
            this.queueKey = `${config.method}-${url}`;
            // 请求前 增加请求队列
            Reflect.defineProperty(this.requestQueue, this.queueKey, { value: url });
            return config;
        }, err => {
            // 增加前台校验token是否过期，需要登录时后台传递过期时间
            Promise.reject(err);
        });
        // 设置响应拦截器
        instance.response.interceptor.use(res => {
            // 请求完成之后删除请求对列中的对应请求
            Reflect.deleteProperty(this.requestQueue, this.queueKey);
            // 如果请求完成且请求队列为空后关闭loading
            if (Object.keys(this.requestQueue).length === 0) {
                this.loading.close();
            }

        }, error => {
            Reflect.deleteProperty(this.requestQueue, this.queueKey);
            if (Object.keys(this.requestQueue).length === 0) {
                this.loading.close();
            }
            if (error.response) {
                // 请求已发送，只不过状态码不是200系列，设置不同状态码的不同处理
                switch (error.response.status) {
                    case 401: // 当前请求需要用户验证（一般是未登录）
                        break;
                    case 403: // 服务器已经理解请求，但是拒绝执行它（一般是TOKEN过期）
                        localStorage.removeItem('token');
                        // 跳转到登录页
                        break;
                    case 404: // 请求失败，请求所希望得到的资源未被在服务器上发现
                        break;
                }
                return Promise.reject(error.response);
            } else {
                // 断网处理
                if (!window.navigator.onLine) {
                    // 断开网络了，可以让其跳转到断网页面
                    return;
                }
                return Promise.reject(error);
            }
        });
    }
    /**
     * 请求数据
     * @param {any} options 请求配置
     */
    request(options) {
        let instance = axios.create();
        let config = {
            ...options,
            baseURL: this.baseURL,
            timeout: this.timeout,
            validateStatus: this.validateStatus
        }
        this.setInterceptor(instance, options.url); // 给这个实例增加拦截功能
        return instance(config); // 返回的是一个promise
    }
}