// adminModify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    admin: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.admin)
    this.setData({
      admin: options.admin
    })
  },

  /**
   * 责任人输入框失去焦点
   */
  getAdminStr: function (e) {
    this.setData({
      admin: e.detail.value
    })
  },

  /**
   * 责任人修改确定
   */
  adminChanged: function () {
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      dutyMans: this.data.admin.split(",")
    })
    wx.navigateBack({
      delta: 1
    })
  }
})