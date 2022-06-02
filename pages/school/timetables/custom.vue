<template>
	<view :class="isDark?'darkBg':''">
		<cu-custom :bgColor="isDark?'bg-black':'bg-orange'" isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">自定义课表</block>
		</cu-custom>
		<view :class="isDark?'dark':''">

			<view class="cu-bar bg-white solid-bottom" style="font-weight:bold" :class="isDark?'dark':'bg-white'">
				<view class="action">
					<text class="cuIcon-titles text-orange"></text>自定义课表
					<text class="cuIcon-search"></text>
				</view>
			</view>

			<view class="margin  padding radius shadow-lg" :class="isDark?'darkIn':'light'">
				<form class="form" @submit="add">
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">课程名</view>
						<input placeholder="体育课" name="courseName"></input>
					</view>
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">老师</view>
						<input placeholder="女足" name="teacher"></input>
					</view>
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">周数</view>
						<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange"
							:value="multiIndex" :range="multiArray">
							<view class="picker">
								{{multiArray[0][multiIndex[0]]}}-{{multiArray[1][multiIndex[1]]}}周({{multiArray[2][multiIndex[2]]}})
							</view>
						</picker>
					</view>
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">星期</view>
						<picker @change="PickerChangeWeek" :value="indexWeek" :range="pickerWeek">
							<view class="picker">
								{{indexWeek>-1?pickerWeek[indexWeek]:''}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">开始节次</view>
						<picker @change="PickerChangeStartCourse" :value="indexStartCourse" :range="pickerStartCourse">
							<view class="picker">
								{{indexStartCourse>-1?pickerStartCourse[indexStartCourse]:''}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">结束节次</view>
						<picker @change="PickerChangeEndCourse" :value="indexEndCourse" :range="pickerEndCourse">
							<view class="picker">
								{{indexEndCourse>-1?pickerEndCourse[indexEndCourse]:''}}
							</view>
						</picker>
					</view>
					<view class="cu-form-group" :class="isDark?'darkIn':'light'">
						<view class="title">地点</view>
						<input placeholder="体育场" name="place"></input>
					</view>


					<view class="cu-bar btn-group">
						<button class="cu-btn bg-green shadow-blur round lg" form-type="submit"
							type="primary">添加课程</button>
					</view>

				</form>





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
				pickerWeek: ['1', '2', '3', '4', '5', '6', '7'],
				pickerStartCourse: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				pickerEndCourse: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
				indexWeek: 0,
				indexStartCourse: 0,
				indexEndCourse: 0,
				multiArray: [
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
						'19', '20', '21', '22', '23', '24', '25'
					],
					['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18',
						'19', '20', '21', '22', '23', '24', '25'
					],
					['全部', '单数', '双数']
				],
				multiIndex: [0, 0, 0],
				weekNum: '1-1周'


			}
		},
		onShow() {
			let _this = this
		},

		methods: {
			MultiColumnChange(e) {
				let data = {
					multiArray: this.multiArray,
					multiIndex: this.multiIndex
				};
				data.multiIndex[e.detail.column] = e.detail.value;
				//console.log(e.detail.value)
			},

			MultiChange(e) {
				this.multiIndex = e.detail.value
				//console.log(this.multiArray[0][this.multiIndex[0]])
				//console.log(this.multiArray[1][this.multiIndex[1]])
				//console.log(this.multiArray[2][this.multiIndex[2]])
				if (this.multiArray[2][this.multiIndex[2]] == '全部') {
					this.weekNum = this.multiArray[0][this.multiIndex[0]] + "-" +
						this.multiArray[1][this.multiIndex[1]] + "周"
				} else if (this.multiArray[2][this.multiIndex[2]] == '单数') {
					this.weekNum = this.multiArray[0][this.multiIndex[0]] + "-" +
						this.multiArray[1][this.multiIndex[1]] + "周(单)"
				} else if (this.multiArray[2][this.multiIndex[2]] == '双数') {
					this.weekNum = this.multiArray[0][this.multiIndex[0]] + "-" +
						this.multiArray[1][this.multiIndex[1]] + "周(双)"
				}
			},
			PickerChangeWeek(e) {
				this.indexWeek = e.detail.value
			},
			PickerChangeStartCourse(e) {
				this.indexStartCourse = e.detail.value
			},
			PickerChangeEndCourse(e) {
				this.indexEndCourse = e.detail.value
			},
			/**
			 * @description  请求网络数据
			 */
			add: function(e) {
				let _this = this
				var formdata = e.detail.value
				formdata.id = 1
				formdata.startCourse = this.pickerStartCourse[this.indexStartCourse]
				formdata.endCourse = this.pickerEndCourse[this.indexEndCourse]
				formdata.week = this.pickerWeek[this.indexWeek]
				formdata.weekNum = this.weekNum
				//console.log(formdata)
				var arr = []
				arr[0] = formdata
				const myCustomTimetable = _this.$store.state.myCustomTimetable
				var timetable = null
				if (myCustomTimetable.length != undefined) {
					timetable = myCustomTimetable.concat(arr)
				} else {
					timetable = arr
				}
				_this.$store.commit("myCustomTimetable", timetable)
				uni.showModal({
					content: "添加成功",
					showCancel: false,
				})
			}



		}

	}
</script>

<style>

</style>
