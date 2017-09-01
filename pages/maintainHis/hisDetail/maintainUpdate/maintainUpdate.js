// maintainUpdate.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusArray: [{
      name: '未开始',
      checked: true,
      value: 0
    }, {
      name: '未完成',
      checked: false,
      value: 1
    }, {
      name: '完成',
      checked: false,
      value: 2
    }, {
      name: '取消',
      checked: false,
      value: 3
    }],
    partStatus: [{
      name: '未检',
      checked: true,
      value: 0
    }, {
      name: '正常',
      checked: false,
      value: 1
    }, {
      name: '异常',
      checked: false,
      value: 2
    }, {
      name: '本次不检',
      checked: false,
      value: 3
    }],
    position: '请输入保养地点',         // 填报地点
    maintainContent: '请输入保养内容',  // 填报内容
    recorderNO: 0,                    // 记录编号
    recorderPlan: '',                 // 所属保养计划
    recorderStatus: 0,                // 保养状态 （0：未开始，1：完成，2：进行中，3：取消）
    carNO: '',                        // 车牌号码
    unit: '',                         // 所属单位
    recorderTime: '',                 // 填报时间
    dutyMans: [],                     // 责 任 人

    imageArray: [],                   // 填报时上传图片的数组
    partsInfo: [],                    // 待保部件及状态

    partsIndex: 0,
    maskDisplay: 'none',
    partSelectDisplay: 'none',
    completeDisplay: 'none',
    
    todayDate: '2017-01-01'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBaseData(JSON.parse(options.info))
    this.getPartsData(JSON.parse(options.parts))
  },

  /**
   * 加载页面的基础数据
   */
  getBaseData: function(item) {
    this.setData({
      recorderNO: item.maintRecNum,
      recorderPlan: item.maintenancePlan.name,
      recorderStatus: item.status,
      carNO: item.vehicleNO,
      unit: item.enterpriseName,
      recorderTime: item.nextMaintTime.substr(0,10),
      dutyMans: item.dutyMans,
      todayDate: this.getDateStr()
    })
  },

  /**
   * 加载页面的部件数据
   */
  getPartsData: function (partsList) {
    this.setData({
      partsInfo: partsList
    })
  },

  /**
   * 获取当天的日期字符串
   */
  getDateStr: function () {
    const date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    return year + '-' + month + '-' + day;
  },

  /**
   * 弹出部件状态调整对话框
   */
  changePartStau: function (e) {
    var checkedAry = [false, false, false, false];
    checkedAry[this.data.partsInfo[e.currentTarget.dataset.index].status] = true;
    
    this.setData({
      maskDisplay: 'block',
      partSelectDisplay: 'block',
      partsIndex: e.currentTarget.dataset.index,
      partStatus: [{
        name: '未检',
        checked: checkedAry[0],
        value: 0
      }, {
        name: '正常',
        checked: checkedAry[1],
        value: 1
      }, {
        name: '异常',
        checked: checkedAry[2],
        value: 2
      }, {
        name: '本次不检',
        checked: checkedAry[3],
        value: 3
      }],
    })
  },

  /**
   * 部件状态调整
   */
  partStatusChanged: function(e) {
    var _partsInfo = this.data.partsInfo
    var index = this.data.partsIndex
    console.log(e.detail.value)
    _partsInfo[index].status = e.detail.value;
    this.setData({
      partsInfo: _partsInfo,
      maskDisplay: 'none',
      partSelectDisplay: 'none'
    })
  },

  /**
   * 弹出完成情况状态调整对话框
   */
  changeCompleteStau: function() {
    var checkedAry = [false, false, false, false];
    checkedAry[this.data.recorderStatus] = true;
    
    this.setData({
      maskDisplay: 'block',
      completeDisplay: 'block',
      statusArray: [{
        name: '未开始',
        checked: checkedAry[0],
        value: 0
      }, {
        name: '未完成',
        checked: checkedAry[1],
        value: 1
      }, {
        name: '完成',
        checked: checkedAry[2],
        value: 2
      }, {
        name: '取消',
        checked: checkedAry[3],
        value: 3
      }]
    })
  },

  /**
   * 完成状态调整
   */
  completeSelect: function (e) {
    this.setData({
      recorderStatus: e.detail.value,
      maskDisplay: 'none',
      completeDisplay: 'none'
    })
  },

  /**
   * 退出mask操作模式
   */
  exitMask: function() {
    this.setData({
      maskDisplay: 'none',
      partSelectDisplay: 'none',
      completeDisplay: 'none'
    })
  },

  /**
   * 日期选择变更确定
   */
  changeDate: function(e) {
    this.setData({
      recorderTime: e.detail.value
    })
  },

  /**
   *  责任人修改页面
   */
  adminModify: function() {
    wx.navigateTo({
      url: './adminModify/adminModify?admin='+this.data.dutyMans.toString(),
      fail: function(res) {
        console.log(res)
      }
    })
  },

  /**
   *  保养地点修改页面
   */
  positionModify: function () {
    wx.navigateTo({
      url: './positionModify/positionModify?position=' + this.data.position,
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 保养内容修改页面
   */
  contentModify: function() {
    wx.navigateTo({
      url: './contentModify/contentModify?content=' + this.data.maintainContent,
      fail: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 图片上传
   */
  uploadImageBt: function() {
    wx.navigateTo({
      url: 'uploadImage/uploadImage?images='+JSON.stringify(this.data.imageArray),
      fail: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 提交
   */
  submitInfo: function() {
    /**
     * 虚拟提交成功
     */
    wx.showLoading({
      title: '更新记录',
      mask: true
    })
    setTimeout(this.timeout, 500);
  },

  timeout: function() {
    wx.hideLoading();
    wx.showToast({
      title: '更新成功',
      mask: true
    })
    wx.navigateBack({ 
      delta: 1 
    })
  }

})