// positionModify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    position: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      position: options.position
    })
  },

  /**
   * 保养位置输入框变更
   */
  getPositionStr: function (e) {
    this.setData({
      position: e.detail.value
    })
  },

  /**
   * 保养位置修改确定
   */
  positionChanged: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      position: this.data.position
    })
    wx.navigateBack({
      delta: 1
    })
  }
})