// uploadImage.js
var longTapFlag = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempStr: 'hello',

    imageSize: 0,
    imageArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      imageArray: JSON.parse(options.images)
    })
  },

  /**
   * 添加图片
   */
  addImage: function() {
    var imgAry = this.data.imageArray;
    var that = this;              // 在chooseImage内无法用this访问到当前页面
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        imgAry = imgAry.concat(res.tempFilePaths)
        that.setData({
          imageArray: imgAry
        })
      }
    })
  },

  /**
   * 删除照片
   */
  deletePhoto: function(event) {
    longTapFlag = 1;
    var imgAry = this.data.imageArray;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否要删除该照片',
      success: function (res) {
        if (res.confirm) {
          imgAry.splice(event.currentTarget.dataset.index,1);
          that.setData({
            imageArray: imgAry
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /**
   * 预览照片
   */
  previewPhoto: function(event) {
    if (longTapFlag) {
      longTapFlag = 0;
      return;
    }
    var imgAry = this.data.imageArray;
    console.log(imgAry)
    wx.previewImage({
      current: imgAry[event.currentTarget.dataset.index], // 当前显示图片的http链接
      urls: imgAry // 需要预览的图片http链接列表
    })
  },

  /**
   * 图片添加完成
   */
  completeBt: function() {
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      imageArray: that.data.imageArray
    })
    wx.navigateBack({
      delta: 1,
    })
  }
  
})