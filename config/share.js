export default {
	data() {
		return {
			share: {
				title: '一个校内学生做的公益小程序',
				imageUrl: 'https://h5.jokeworld.cn/img/share.png?id=' + (new Date()).valueOf(),
			}
		}
	},
	onShareAppMessage(res) { //发送给朋友
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
		}
	},
	onShareTimeline(res) { //分享到朋友圈
		return {
			title: this.share.title,
			imageUrl: this.share.imageUrl,
		}
	},
}
