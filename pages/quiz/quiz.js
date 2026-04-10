const { QUESTIONS, computeResult } = require('../../utils/questions.js')
const app = getApp()

function calcMeta(idx) {
  const total = QUESTIONS.length
  const remaining = total - idx
  const progressPercent = (idx / total) * 100
  const progressPercentInt = Math.round(progressPercent)
  return { remaining, progressPercent, progressPercentInt }
}

Page({
  data: {
    total: QUESTIONS.length,
    currentIndex: 0,
    question: QUESTIONS[0],
    progressPercent: 0,
    progressPercentInt: 0,
    remaining: QUESTIONS.length,
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
    const meta = calcMeta(idx)
    this.setData({
      currentIndex: idx,
      question: QUESTIONS[idx],
      ...meta
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
    const meta = calcMeta(next)
    this.setData({
      currentIndex: next,
      question: QUESTIONS[next],
      ...meta
    })
  }
})
