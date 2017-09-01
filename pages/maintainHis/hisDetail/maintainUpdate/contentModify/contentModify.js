// contentModify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.content)
    this.setData({
      content: options.content
    })
  },

  /**
   * 保养内容输入新数据
   */
  getContentStr: function (e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 保养内容修改确定
   */
  contentChanged: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      maintainContent: this.data.content
    })
    wx.navigateBack({
      delta: 1
    })
  }
})