// hisDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailInfoStr: '',  // 详情JSON数据的字符串形式，用于传送到下一个页面
    partsInfoStr: '',   // 部件JSON数据的字符串形式，用于传送到下一个页面
    imagePath: '/images/default.png',
    infoArray: [],
    partsArray: [],
    statusArray: ['未开始','完成','进行中','取消'],
    partStatus: ['未检','正常','异常','本次不检'],
    partStatusColor: ['gray','green','red','gray']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      detailInfoStr: options.info
    })
    this.getBaseInfo(JSON.parse(options.info));
    this.getPartsInfo();
  },

  /**
   * 格式化日期
   */
  pattenDate: function(dateInfo) {
    return dateInfo.substr(0,10)
  },

  /**
   * 设置基本信息
   */
  getBaseInfo: function(item) {
    this.setData({
      imagePath: item.maintenancePlan.equipmentMinType.imagePath,
      infoArray: [{
        'key': '记录编号',
        'value': item.maintRecNum
      }, {
        'key': '保养计划',
        'value': item.maintenancePlan.name
      }, {
        'key': '保养状态',
        'value': this.data.statusArray[item.status]
      }, {
        'key': '车牌号码',
        'value': item.vehicleNO
      }, {
        'key': '所属单位',
        'value': item.enterpriseName
      }, {
        'key': '开始时间',
        'value': this.pattenDate(item.starttime)
      }, {
        'key': '结束时间',
        'value': this.pattenDate(item.endtime)
      }, {
        'key': '责任人',
        'value': item.dutyMans
      }, {
        'key': '维修人员',
        'value': item.maintMans
      }, {
        'key': '待保时间',
        'value': this.pattenDate(item.nextMaintTime)
      }]
    })
  },

  /**
   * 获取部件状态信息
   */
  getPartsInfo: function() {

    const datas = [
      {
        "status": 0,
        "unit": {
          "name": "润滑系统"
        }
      },
      {
        "status": 1,
        "unit": {
          "name": "水力系统"
        }
      },
      {
        "status": 2,
        "unit": {
          "name": "发动机"
        }
      },
      {
        "status": 3,
        "unit": {
          "name": "泡沫系统"
        }
      }
    ];

    this.setData({
      partsArray: datas,
      partsInfoStr: JSON.stringify(datas)
    })

    // wx.showLoading({
    //   title: '数据加载中',
    //   mask: true
    // })
    // var that = this
    // wx.request({
    //   url: getApp().request_host + 'parts_list.json',
    //   data: {},
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'GET',
    //   dataType: '',
    //   success: function (res) {
    //     that.setData({
    //       partsArray: res.data.datas,
    //       partsInfoStr: JSON.stringify(res.data.datas)
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   },
    //   complete: function (res) {
    //     wx.hideLoading();
    //   }
    // })
  },

  /**
   * 更新按钮提报
   */
  updateInfo: function() {
    wx.navigateTo({
      url: './maintainUpdate/maintainUpdate?info=' + this.data.detailInfoStr + '&parts=' + this.data.partsInfoStr,
      fail: function(res) {
        console.log(res)
      }
    })
  }
})