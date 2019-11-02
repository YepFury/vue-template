import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home/index.vue';
import loadable from '@/utils/loadable';
import hooks from './hook';
Vue.use(Router);

let router = new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		// {
		// 	path: '/other',
		// 	name: 'other',
		// 	// 异步加载组件
		// 	component: loadable(() => import('@/views/Course/index.vue'))
		// },
		{
			path: '/login',
			name: 'login',
			component: loadable(() => import('@/views/Login/login.vue'))
		}
	]
});
Object.values(hooks).forEach(hook => {
	/// 路由切换之前
	router.beforeEach(hook)
});


export default router
