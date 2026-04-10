const { QUESTIONS, computeResult } = require('../../utils/questions.js')
const app = getApp()

Page({
  data: {
    total: QUESTIONS.length,
    currentIndex: 0,
    question: QUESTIONS[0],
    progressPercent: 0,
    labels: ['A', 'B', 'C', 'D']
  },

  onShow() {
    this.syncFromAnswers()
  },

  syncFromAnswers() {
    const answers = app.globalData.answers
    const idx = answers.length
    if (idx >= QUESTIONS.length) {
      wx.redirectTo({ url: '/pages/result/result' })
      return
    }
    const progressPercent = (idx / QUESTIONS.length) * 100
    this.setData({
      currentIndex: idx,
      question: QUESTIONS[idx],
      progressPercent
    })
  },

  onPick(e) {
    const optionIndex = Number(e.currentTarget.dataset.index)
    const answers = app.globalData.answers
    answers.push(optionIndex)
    if (answers.length >= QUESTIONS.length) {
      const { winner, scores } = computeResult(answers)
      wx.setStorageSync('aiti_last_result', { winner, scores, ts: Date.now() })
      wx.redirectTo({ url: '/pages/result/result' })
      return
    }
    const next = answers.length
    const progressPercent = (next / QUESTIONS.length) * 100
    this.setData({
      currentIndex: next,
      question: QUESTIONS[next],
      progressPercent
    })
  }
})
