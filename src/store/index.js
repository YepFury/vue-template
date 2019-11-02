import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import home from './modules/home';
import { login } from '@/api/user';
Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		home
	},
	state: {
		// 存放用户信息
		user: {},
		// 存放所有请求令牌，可以用来切换页面时取消没请求完的接口
		requestTokens: []
	},
	mutations: {
		[types.SET_USER](state, payload) {
			state.user = payload;
		},
		// 调用请求时存储
		[types.PUSH_REQUEST](state, cancel) {
			state.requestTokens = [...state.requestTokens, cancel]
		},
		// 切换路由时取消
		[types.CLEAR_REQUEST](state) {
			// 依次调用取消请求的方法
			state.requestTokens.forEach(cancel => cancel());
			state.requestTokens = []; // 清空数组
		}
	},
	actions: {
		async [types.LOGIN]({
			commit
		}, user) {
			try {
				let result = await login(user);
				commit(types.SET_USER, result);
				/// 将token存储到localStorage中
				localStorage.setItem('token', result.token);
			} catch (e) {
				Toast.$create({
					txt: '用户无法登录',
					time: 2000
				}).show(); // 显示错误提示
			}

		}
	},
});
