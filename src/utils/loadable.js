// 实现转场动画(参考https://cn.vuejs.org/v2/guide/components-dynamic-async.html#%E5%BC%82%E6%AD%A5%E7%BB%84%E4%BB%B6)
// import LoadingComponent from '@/components/Loading'
// import ErrorComponent from '@/components/error'

const loadable = (asyncFunction) => {
	const asyncComponent = () => ({
		// 需要加载的组件 (应该是一个 `Promise` 对象)
		component: asyncFunction(),
		// 异步组件加载时使用的组件
		// loading: LoadingComponent,
		// 加载失败时使用的组件
		// error: ErrorComponent,
		// 展示加载时组件的延时时间。默认值是 200 (毫秒)
		delay: 200,
		// 如果提供了超时时间且组件加载也超时了，
		// 则使用加载失败时使用的组件。默认值是：`Infinity`
		timeout: 8000
	})
	// 返回一个组件，组件需要有render，通过render去渲染一个异步组件
	return {
		render(h) {
			return h(asyncComponent)
		}
	}
}
export default loadable
