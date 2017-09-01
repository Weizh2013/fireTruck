// index.js

// var WXBizDataCrypt = require('../../libs/WXBizDataCrypt.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarImg: '/images/default_avatar.png',
    loginDisplay: 'block',
    userInfoDisplay: 'none',
    nickName: '剑气书香',
    phoneNum: '18774966206',
    role: '服务工程师',
    titleViewAnimation: {},
    imageAnimation: {}, 
    labelAnimation: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 微信登陆按钮按下
   */
  wxLogin: function() {
    // wx.navigateTo({
    //   url: './bindNum/bindNum'
    // })

    wx.showLoading({
      title: '登陆中',
    })
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      lang: 'zh_CN',
      success: function (res) {
        that.setData({
          nickName: res.userInfo.nickName,
          avatarImg: res.userInfo.avatarUrl, 
          loginDisplay: 'none',
          userInfoDisplay: 'block'
        })
        that.animationStart();
        /**
         * 先虚拟直接登陆成功
         */
        // wx.navigateTo({
        //   url: './bindNum/bindNum'
        // })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function(res) {
        wx.hideLoading();
      }
    })
  },

  storageStr: function() {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 开始动画
   */
  animationStart: function() {
    var animation1 = wx.createAnimation({
      duration: 600,
      timingFunction: "linear"
    })
    animation1.height('400rpx').step()

    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "linear"
    })
    animation2.translateY(-30).scale(0.8,0.8).step()
    
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: "linear",
      delay: 50
    })
    animation3.translateY(-40).step()

    this.setData({
      titleViewAnimation: animation1.export(),
      imageAnimation: animation2.export(),
      labelAnimation: animation3.export()
    })

  }
})