const app = getApp()

Page({
  onStart() {
    app.resetAnswers()
    wx.navigateTo({
      url: '/pages/quiz/quiz'
    })
  }
})
