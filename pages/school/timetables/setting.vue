<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-yellow'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">课表设置</block>
		</cu-custom>

		<view :class="isDark?'dark':''">

			<view class="cu-bar bg-white solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
				<view class="action">
					<text class="cuIcon-titles text-yellow"></text>课表设置
					<text class="cuIcon-settings"></text>
				</view>
			</view>

			<view class="margin-top" :class="isDark?'dark':'bg-white'">
				<view class="cu-form-group">
					<view class="title">是否需要根据通知调课</view>
					<picker @change="PickerChange" :value="indexChange" :range="pickerChange">
						<view class="picker">
							{{pickerChange[indexChange]}}
						</view>
					</picker>
				</view>

				<view class="cu-form-group ">
					<view class="title">课表颜色</view>
					<picker @change="PickerColor" :value="indexColor" :range="pickerColor">
						<view class="picker">
							{{pickerColor[indexColor]}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">
						背景图片上传
					</view>
				</view>
				<view class="padding">
					<view class="grid col-4 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage"
							:data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
							<text class='cuIcon-cameraadd'></text>
						</view>
					</view>
				</view>
				<view class="padding ">
					<view class="flex">
						<view class="cu-progress round sm striped" :class="active?'active':''">
							<view class="bg-green" :style="[{ width:loading}]"></view>
						</view>
					</view>
				</view>

			</view>

			<view class="cu-tabbar-height"></view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				isDark: this.isDark,
				indexChange: 0,
				pickerChange: ['是', '否'],
				indexColor: 0,
				pickerColor: ['深色', '浅色'],
				imgList: [],
				index: 0,
				loading: '0%',
				active: false,
				imgUploadList: []

			}
		},
		onShow() {

			let _this = this
			if (_this.$store.state.timeTableBgUrl != null) {
				_this.imgList = []

				_this.imgList[0] = _this.$util.getImageUrl(_this.$store.state.timeTableBgUrl)

				_this.loading = "100%"
			}
			if (_this.$store.state.timeTableChangeIndex != null) {
				_this.indexChange = _this.$store.state.timeTableChangeIndex
			}
			if (_this.$store.state.timeTableColorIndex != null) {
				_this.indexColor = _this.$store.state.timeTableColorIndex
			}
		},
		methods: {
			PickerChange(e) {
				this.indexChange = e.detail.value
				this.$store.commit("timeTableChangeIndex", this.indexChange)
			},
			PickerColor(e) {
				this.indexColor = e.detail.value
				this.$store.commit("timeTableColorIndex", this.indexColor)
			},
			ChooseImage() {
				let _this = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						_this.imgList = res.tempFilePaths
						this.$publicApi.uploadImage(res.tempFilePaths[0]).then(result => {
							//res为返回的链接地址，将这个链接重新以参数形式传给后台
							console.log(result)
							var url = result

							_this.imgList[0] = _this.$util.getImageUrl(url)
							_this.imgUploadList[0] = _this.$util.getImageUrl(url)

							_this.loading = (Math.round(_this.imgUploadList.length / _this
								.imgList
								.length * 10000) / 100.00) + "%"
							if (_this.loading == "100%") {
								_this.active = false
							}

							_this.$store.commit("timeTableBgUrl", url)
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: '已经设置课表背景成功!',
								success: function(res) {

								}
							});
						})
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				let _this = this
				uni.showModal({
					title: '提示',
					content: '确定要删除这张背景图片？',
					cancelText: '我再想想',
					confirmText: '确定删除',
					success: res => {
						if (res.confirm) {
							_this.loading = "0%"
							_this.imgList.splice(e.currentTarget.dataset.index, 1)
							_this.$store.commit("cleanCacheData", "timeTableBgUrl")
						}
					}
				})
			},


		}

	}
</script>

<style>

</style>
