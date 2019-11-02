// 提供请求用户信息的相关方法，例如登录，注册等
import axios from '@/utils/request';

/**
 * 登录
 */
export const login = (user) => {
    return axios.request({
        url: '/login',
        method: 'POST',
        data: user
    })
}
/**
 * 注册
 */
export const register = () => {

}