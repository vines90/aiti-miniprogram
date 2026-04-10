const { TYPES, RESULT_LINES } = require('../../utils/questions.js')
const app = getApp()

Page({
  data: {
    type: null,
    line: '',
    shareTitle: ''
  },

  onLoad() {
    this.loadResult()
  },

  onShow() {
    this.loadResult()
  },

  loadResult() {
    const stored = wx.getStorageSync('aiti_last_result')
    if (!stored || !stored.winner) {
      this.setData({ type: null, line: '', shareTitle: '' })
      return
    }
    const key = stored.winner
    const type = TYPES[key]
    const line = RESULT_LINES[key] || ''
    const shareTitle = `我是【${type.tag}】${type.name}，你是什么 AI 人？`
    this.setData({ type, line, shareTitle })
  },

  onShareAppMessage() {
    return {
      title: this.data.shareTitle || 'AITI — 你是什么 AI 人？',
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: this.data.shareTitle || 'AITI — AI 使用者人格测试'
    }
  },

  onAgain() {
    app.resetAnswers()
    wx.removeStorageSync('aiti_last_result')
    wx.redirectTo({ url: '/pages/quiz/quiz' })
  },

  onHome() {
    wx.reLaunch({ url: '/pages/index/index' })
  }
})
