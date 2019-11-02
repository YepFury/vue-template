import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js'
import filters from './utils/filters';
import directives from './utils/directives';
Vue.config.productionTip = false;
// 注册全局过滤器
for (let key in filters) {
	Vue.filter(key, filters[key]);
}
// 注册全局指令
for (let key in directives) {
	Vue.filter(key, directives[key]);
}

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
