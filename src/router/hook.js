// 根路由相关的hook
import store from '@/store';
import * as types from '@/store/actions-type'

export default {
     // 清除已经生成请求令牌的请求
    cancelToken: (to, from, next) => {
        store.commit(types.CLEAR_REQUEST);
        next();
    }
}
