// bindNum.js

var timer;
var count = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    btColor: '#c8c8c8',
    clock: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 手机号码输入框有新的输入
   */
  phoneNumChanged: function(e) {
    if (this.data.clock != '') {
      this.setData({
        phoneNum: e.detail.value
      })
      return;                       // 如果在60s缓冲期，不使能按键
    }

    this.setData({
      phoneNum: e.detail.value,
      btColor: this.getKeyBgColor(e.detail.value)
    })
  },

  /**
   * 获取短信验证码
   */
  getCode: function() {
    if (this.data.btColor == 'green') {
      /**
       * 发送验证码请求，进入验证码页面
       */
      timer = setInterval(this.clockChange, 1000);
      count = 60;
      this.setData({
        clock: '('+count+'s)',
        btColor: '#c8c8c8'
      })
    } else if (this.data.clock != '') {
        wx.showModal({
          title: '提示',
          content: '60秒内不能重复发送',
        })
        return;
    } else {
      wx.showModal({
        title: '提示',
        content: '手机号码格式不正确',
      })
    }
  },

  /**
   * 倒计时，每1s进来一次
   */
  clockChange: function() {
    count--;
    if (count == 0) {
      clearInterval(timer);
      this.setData({
        btColor: this.getKeyBgColor(this.data.phoneNum),
        clock: ''
      })
      return
    }
    this.setData({
      clock: '('+count+'s)'
    })
  },

  /**
   * 手机号码正则表达式检查
   */
  checkNum: function(phoneNum) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (!myreg.test(phoneNum)) {
      return false;
    } else {
      return true;
    }
  },

  /**
   * 根据手机号码格式获取按键状态
   */
  getKeyBgColor: function(phoneNum) {
    if (this.checkNum(phoneNum)) {
      return 'green'
    } else {
      return '#c8c8c8'
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})