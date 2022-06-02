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

			<view class="margin-top " :class="isDark?'dark':'bg-white'">
				<view class="cu-form-group">
					<view class="title">是否需要根据通知调课</view>
					<picker @change="PickerChange" :value="indexChange" :range="pickerChange">
						<view class="picker">
							{{pickerChange[indexChange]}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">我的课表颜色</view>
					<input placeholder="#0066CC" name="myColor" v-model="myColor" @input="myColorInput"
						maxlength="7"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">情侣课表颜色</view>
					<input placeholder="#FF6666" name="loverColor" v-model="loverColor" maxlength="7"
						@input="loverColorInput"></input>
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
				myColor: null,
				loverColor: null,
				imgList: [],
				index: 0,
				loading: '0%',
				active: false,
				imgUploadList: [],
				indexChange: 0,
				pickerChange: ['是', '否'],
			}
		},
		onShow() {

			let _this = this
			if (_this.$store.state.loverTimeTableBgUrl != null) {
				_this.imgList = []
				_this.imgList[0] = _this.$util.getImageUrl(_this.$store.state.loverTimeTableBgUrl)
				_this.loading = "100%"
			}
			if (_this.$store.state.loverTimeTableChangeIndex != null) {
				_this.indexChange = _this.$store.state.loverTimeTableChangeIndex
			}
			if (_this.$store.state.loverTimeTableMyColor != null) {
				_this.myColor = _this.$store.state.loverTimeTableMyColor
			}
			if (_this.$store.state.loverTimeTableLoverColor != null) {
				_this.loverColor = _this.$store.state.loverTimeTableLoverColor
			}



		},
		methods: {
			PickerChange(e) {
				this.indexChange = e.detail.value
				this.$store.commit("loverTimeTableChangeIndex", this.indexChange)
			},
			myColorInput(e) {
				// 传入的Vue是没问题的,但是uni-app会延时,导致输入的结果和打印的结果有时间误差，不一致！
				// uni-app框架官方说明：input事件处理函数内实时修改当前值不生效，可以延迟设置！
				// 延时的结果,输入的结果和打印的结果一致！
				setTimeout(() => {
					this.myColor = e.detail.value
					if (this.myColor.length == 7) {
						console.log(this.myColor.indexOf('#'))
						if (this.myColor.indexOf('#') != 0) {
							uni.showToast({
								icon: 'none',
								title: "颜色格式不对"
							})
							return
						}
						this.$store.commit("loverTimeTableMyColor", this.myColor)
						uni.showToast({
							icon: 'none',
							title: "修改成功"
						})
					}
					if (this.myColor.length == 0) {
						this.$store.commit("loverTimeTableMyColor", "#0066CC")
						uni.showToast({
							icon: 'none',
							title: "还原成功"
						})
					}
				}, 0)
			},
			loverColorInput(e) {
				// 传入的Vue是没问题的,但是uni-app会延时,导致输入的结果和打印的结果有时间误差，不一致！
				// uni-app框架官方说明：input事件处理函数内实时修改当前值不生效，可以延迟设置！
				// 延时的结果,输入的结果和打印的结果一致！
				//console.log(e.detail.value)
				setTimeout(() => {
					this.loverColor = e.detail.value
					if (this.loverColor.length == 7) {
						if (this.loverColor.indexOf('#') != 0) {
							uni.showToast({
								icon: 'none',
								title: "颜色格式不对"
							})
							return
						}
						this.$store.commit("loverTimeTableLoverColor", this.loverColor)
						uni.showToast({
							icon: 'none',
							title: "修改成功"
						})
					}
					if (this.loverColor.length == 0) {
						this.$store.commit("loverTimeTableLoverColor", "#FF6666")
						uni.showToast({
							icon: 'none',
							title: "还原成功"
						})
					}
				}, 0)
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
							_this.$store.commit("loverTimeTableBgUrl", url)
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
							_this.$store.commit("cleanCacheData", "loverTimeTableBgUrl")
						}
					}
				})
			},



		}

	}
</script>

<style>

</style>
