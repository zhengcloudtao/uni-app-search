//// #ifndef VUE3
import App from './App'

import Vue from 'vue'
Vue.config.productionTip = false
import cuCustom from '@/colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)
import waterMarker from "@/uni_modules/zmm-watermark/components/zmm-watermark/zmm-watermark.vue"
Vue.component('zmm-watermark', waterMarker)
//store
import store from '@/store'
Vue.prototype.$store = store;
//api
import api from '@/plugins/request/'
Vue.prototype.$api = api
//url
import {
	BaseApi,
	cdnBaseApi
} from '@/plugins/request/baseApi.js'
Vue.prototype.$BaseApi = BaseApi
Vue.prototype.$cdnBaseApi = cdnBaseApi
// http接口API集中管理引入部分
import indexApi from '@/apis/index'
Vue.prototype.$indexApi = indexApi
import publicApi from '@/apis/public'
Vue.prototype.$publicApi = publicApi
import userApi from '@/apis/modules/user'
Vue.prototype.$userApi = userApi
import schoolApi from '@/apis/modules/school'
Vue.prototype.$schoolApi = schoolApi
//router
import router from '@/plugins/router/router.js'
Vue.use(router)
//share
import share from '@/config/share.js'
Vue.mixin(share)
import util from '@/plugins/utils/util.js'
Vue.prototype.$util = util

//这两个需要设置，不然前端向后台不能传递数据

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// // #endif

// // #ifdef VUE3
// import { createSSRApp } from 'vue'
// import App from './App.vue'
// export function createApp() {
//   const app = createSSRApp(App)
//   return {
//     app
//   }
// }
// // #endif
