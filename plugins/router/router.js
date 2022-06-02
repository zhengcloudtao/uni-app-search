import Router from './index.js'

const router = new Router({
	homePage: '/pages/index/index'
})

router.beforeEach((to, from, next) => {
	console.log('路由beforeEach拦截', to, from)
	next()
})

router.afterEach((to, from) => {
	console.log('路由afterEach拦截')
})

router.error(() => {
	console.log('路由错误')
})

export default router