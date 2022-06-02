<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-cyan'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">课表备注</block>
		</cu-custom>

		<view :class="isDark?'dark':''">

			<view class="cu-bar bg-white solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
				<view class="action">
					<text class="cuIcon-titles text-cyan"></text>备注
					<text class="cuIcon-search"></text>
				</view>
			</view>
			<view class=" padding flex flex-direction" :class="isDark?'dark':'bg-white'">
				<button class="cu-btn round bg-cyan text-white lg">备注总数:{{num}}</button>
			</view>
			<view class="padding  text-grey  shadow-warp cu-list menu card-menu" :class="isDark?'darkIn':'bg-white'"
				style="border: 3rpx solid #000000;">
				<view class="" v-for="(val,index) in list" :key="index" class="solids-bottom">
					<view class="padding  radius " :class="isDark?'darkIn':'bg-white'">
						<view>
							<view>{{val}}</view>
						</view>
					</view>

				</view>

			</view>
			<view class="padding flex flex-wrap " :class="isDark?'dark':'bg-white'">


			</view>
			<view class="cu-tabbar-height"></view>

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
				isDark: this.isDark
			}
		},
		onShow() {
			let _this = this
			try {
				const myTimetable = _this.$store.state.myTimetable
				if (myTimetable.length != undefined) {
					var str = myTimetable[0].remarks
					_this.list = str.split("@@"); //字符分割
					_this.num = _this.list.length
				}
			} catch (e) {
				console.log("error")
			}



		},
		methods: {

		}

	}
</script>

<style>

</style>
