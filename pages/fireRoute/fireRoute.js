// fireRoute.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fireInfo: {
      longitude: 113.0397033691,
      latitude: 28.2420086588,
      name: '藏珑',
      address: '湖南省长沙市开福区洪山街道洪西社区东南方向'
    },
    markers: [],
    screenHeight: '500px'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var firePoint = {
      iconPath: "/images/onFire.gif",
      id: 0,
      latitude: this.data.fireInfo.latitude,
      longitude: this.data.fireInfo.longitude,
      width: 40,
      height: 40
    }
    this.setData({
      markers: [firePoint]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('fireMap')
    console.log(getApp().screenInfo.height)
    this.setData({
      screenHeight: getApp().screenInfo.height+'px'
    })
  },

  /**
   * 火灾点被点击
   */
  fireTapped: function(e) {
    var _fireInfo = this.data.fireInfo;

    wx.openLocation({
      latitude: _fireInfo.latitude,
      longitude: _fireInfo.longitude,
      scale: 28,
      name: _fireInfo.name,
      address: _fireInfo.address
    })

  }

})
