<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-cyan'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">校园巴士</block>
		</cu-custom>

		<view :class="isDark?'dark':''">

			<view class="cu-bar bg-white solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
				<view class="action">
					<text class="cuIcon-titles text-cyan"></text>B855查询
					<text class="cuIcon-search"></text>
				</view>
			</view>


			<view class="margin text-center text-grey  shadow-warp cu-list menu card-menu"
				:class="isDark?'darkIn':'bg-white'" style="border: 3rpx solid #000000;">

				<view v-if="list.length==0" style="text-align: center;font-size: 40rpx;"
					:class="isDark?'darkIn':'bg-white'">


					<image src="../../../static/score/empty.png" style="width: 600rpx;height: 600rpx;margin-top: 0rpx;">
					</image>
				</view>
				<view class="margin-top" v-if="line.length!=0">
					<view>
						<view class="cu-tag bg-red light  round"> {{line.name}}</view>
						<view class="cu-tag bg-cyan light  round"> {{line.startSn}}->
							{{line.endSn}}
						</view>
					</view>
					<view class="margin-top ">
						<view class="cu-tag bg-green light  round"> 单行线</view>
						<view class="cu-tag bg-orange light  round"> 票价{{line.price}}</view>
						<view class="cu-tag bg-blue light  round"> 首{{line.firstTime}}-末{{line.lastTime}}</view>
					</view>

				</view>
				<view class="margin-top" v-if="depDesc.length>0">{{depDesc}}</view>
				<view class="margin-top" v-if="tip.length>0">{{tip}}</view>
				<view style="display: flex;margin-left: 30rpx;">
					<view v-for="(val,index) in list" :key="index" class="margin-top">
						<view style="display: flex;">

							<view
								style=" height:30rpx;width:30rpx;border:8rpx solid red;border-radius:50rpx;margin-top: 93rpx;"
								v-if="val.state==1">
							</view>
							<view
								style=" height:30rpx;width:30rpx;border:8rpx solid green;border-radius:50rpx;margin-top: 93rpx;"
								v-if="val.state!=1">
							</view>
							<view v-if="(index!=list.length-1)&(val.bus>0)">
								<view v-if="val.bus==1" style="height: 32rpx;"></view>
								<view v-if="val.bus>1" style="height: 32rpx;">{{val.bus}}</view>
								<image src="../../../static/bus/bus.png"
									style="width: 64rpx;height: 64rpx;margin-top: 0rpx;">
								</image>
								<view style="width: 64rpx;height: 5rpx;border-top:4px solid red;margin-top: 0rpx;">
								</view>
							</view>
							<view v-if="(index!=list.length-1)&(val.bus==undefined)">


								<view style="width: 64rpx;height: 5rpx;border-top:4px solid green;margin-top: 103rpx;">
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;">
					<view v-for="(val,index) in list" :key="index">
						<view class="padding text-center radius" :class="isDark?'darkIn':'bg-white'"
							:data-index="index+1" @tap="choice">
							<view style="width:35rpx;color:cornflowerblue" v-if="(index+1)==targetOrder">
								<view style="font-weight:bold;">{{index+1}}</view>
								<view style="font-weight:bold" class="text-sm">
									{{val.sn}}
								</view>
								<view style="font-weight:bold">{{val.volunteerTime}}</view>
							</view>
							<view style="width:35rpx;" v-if="(index+1)!=targetOrder">
								<view style="font-weight:bold;">{{index+1}}</view>
								<view style="font-weight:bold" class="text-sm">
									{{val.sn}}
								</view>
								<view style="font-weight:bold">{{val.volunteerTime}}</view>
							</view>
						</view>
					</view>
				</view>

			</view>
			<view class="padding flex flex-wrap " :class="isDark?'darkIn':'bg-white'">
				<button class="cu-btn round line" @click="refresh()">
					<text class="cuIcon-refresh text-right" :class="isDark?'darkIn':''"></text></button>
				<button class="cu-btn round line margin-left-xl" @click="showModal()" style="margin-left: 400rpx;"><text
						class="text-right" :class="isDark?'darkIn':''">使用说明</text></button>
			</view>

			<view class="cu-tabbar-height"></view>

		
		</view>

		<view class="cu-modal" :class="modalName=='DialogModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar  justify-end " :class="isDark?'dark':'bg-white'">
					<view class="content">使用说明</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl" :class="isDark?'darkIn':'bg-white'">
					该功能不会向您索要地理位置，你可以根据自己想看那站的车辆信息可以点击车站名字哦，程序会记住你上次选择车站！
				</view>
				<view class="cu-bar justify-end" :class="isDark?'dark':'bg-white'">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="hideModal">确定</button>
					</view>
				</view>
			</view>
		</view>
	
	</view>
</template>
<script>
	export default {
		data() {
			return {
				list: [],
				total: 0,
				num: 0,
				isDark: this.isDark,
				showEmptyIcon: false,
				targetOrder: 3,
				depDesc: "",
				tip: "",
				line: [],
				modalName: null
			}
		},
		onLoad() {



		},
		onShow() {
			let _this = this
			if (_this.$store.state.busChoice != null) {
				_this.targetOrder = _this.$store.state.busChoice
			}
			if (_this.$store.state.busTip == null) {
				_this.$store.commit("busTip", "1")
				_this.modalName = 'DialogModal'
			}
			_this.refresh()

		},
		methods: {
			showModal() {
				this.modalName = 'DialogModal'
			},
			hideModal(e) {
				this.modalName = null
			},
			choice(e) {
				let _this = this
				var index = e.currentTarget.dataset.index
				console.log(index)
				_this.targetOrder = index
				_this.$store.commit("busChoice", index)
				_this.refresh()
			},
			/**
			 * @description  请求网络数据
			 */
			refresh: function() {
				let _this = this
				var userInfo = _this.$store.state.userInfo
				// if (_this.$store.state.isExit == 1 | userInfo.password == "" || userInfo.password == null) {
				// 	uni.showModal({
				// 		title: 'Hi',
				// 		content: '会话已过期，\n当前功能需要登录,是否要去登录?\n(该程序的用户信息只存在手机本地，当切出程序需要重新登录)',
				// 		confirmText: "去登录",
				// 		cancelText: "再逛会",
				// 		success: function(res) {
				// 			if (res.confirm) {
				// 				_this.$Router.navigateTo("/pages/bind/login/index")
				// 			} else if (res.cancel) {
				// 				console.log("点击了取消")
				// 			} else {
				// 				console.log("点击了别的")
				// 			}
				// 		}
				// 	});
				// 	return
				// }
				var form = {
					targetOrder: _this.targetOrder
				}
				_this.$schoolApi.bus(form).then(response => {
					//console.log(response.code)
					if (response.status == 0) {
						_this.list = response.data.jsonr.data.stations
						_this.depDesc = response.data.jsonr.data.depDesc
						_this.line = response.data.jsonr.data.line
						var tip = response.data.jsonr.data.tip.desc
						if (tip.indexOf("还有") != -1) {
							tip = tip.match(/还有(\S*)分钟/)[1]
							_this.tip = tip + "分钟"
						} else if (tip.indexOf("将在") != -1) {
							tip = tip.match(/将在(\S*)分钟/)[1]
							_this.tip = tip + "分钟"
						} else if (tip == "等车很无聊，看看其他小伙伴在干嘛" | tip == "等车很无聊，去能量馆逛逛呗") {
							_this.tip = ""
						} else {
							_this.tip = tip
						}

						var buses = response.data.jsonr.data.buses
						console.log(buses)

						for (var i = 0; i < buses.length; i++) {
							//console.log(buses[i].order)

							if (_this.list[buses[i].order - 2].bus) {
								_this.list[buses[i].order - 2].bus += 1
							} else {
								_this.list[buses[i].order - 2].bus = 1
							}

							_this.list[buses[i].order - 1].state = 1

						}



					} else if (response.status != 608) {
						uni.showModal({
							title: '提示',
							content: response.msg,
							showCancel: false,
							success: function(res) {
								if (res.confirm) {

								} else if (res.cancel) {

								}
							}
						});
					}

				})

			}
		}

	}
</script>

<style>

</style>
