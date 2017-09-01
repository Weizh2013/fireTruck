// maintainList.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    proArray: [],
    currentPage: 0,
    pageSize: 10,
    isEnd: false,    // 是否刷新到了底部
    scrollerHeight: 500
  },

  /**
   *  获取系统信息 
   */
  onLoad: function() {
    var that = this;
    var currentApp = getApp();
    wx.getSystemInfo({
      success: function (res) {
        currentApp.screenInfo.width = res.windowWidth;
        currentApp.screenInfo.height = res.windowHeight;
        that.setData({
          scrollerHeight: res.windowHeight-20
        })
      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
    
    // wx.showLoading({
    //   title: '数据加载中',
    //   mask: true
    // })
    this.getDatas();
  },

  /**
   * 某个保养计划被点击之后
   */
  proDetailClicked: function (event) {
    var currentInfo = JSON.stringify(this.data.proArray[event.currentTarget.dataset.index]);
    wx.navigateTo({
      url: 'proDetail/proDetail?info=' + currentInfo,
      fail: function(res) {
        console.log(res);
      }
    })
  },

  /**
   * 下拉刷新回调函数
   */
  onPullDownRefresh: function() {
    this.setData({
      proArray: [],
      currentPage: 0,
      isEnd: false
    })    
    // wx.showLoading({
    //   title: '数据加载中',
    //   mask: true
    // })
    this.getDatas()
  },

  /**
   * 上拉获取更多回调
   */
  onReachBottom: function() {
    if (this.data.isEnd) {
      wx.showToast({
        title: '已拉到底'
      })
      return;
    }else {
      this.getDatas()
    }
  },
  

  /**
   * 请求页面数据
   */
  getDatas: function() {
    this.setData({
      isEnd: true,
      proArray: [
        {
          "maintNo": "20170710001",
          "name": "举高喷射消防车整机保养",
          "equipmentBigType": {
            "etCnName": "举高类消防车"
          },
          "equipmentMinType": {
            "etCnName": "举高喷射消防车",
            "bigImagePath": "/images/JGPS.png"
          },
          "equipmentBrand": {
            "cnName": "三一重工"
          },
          "maintenanceUnits": [
            {
              "name": "水力系统"
            },
            {
              "name": "减速机"
            },
            {
              "name": "底盘",
            },
            {
              "name": "分动箱"
            },
            {
              "name": "液压系统"
            },
            {
              "name": "应急动力系统"
            }
          ]
        },
        {
          "maintNo": "20170710002",
          "name": "举高喷射消防车灭火系统保养",
          "equipmentBigType": {
            "etCnName": "举高类消防车"
          },
          "equipmentMinType": {
            "etCnName": "举高喷射消防车",
            "bigImagePath": "/images/JGPS.png"
          },
          "equipmentBrand": {
            "cnName": "三一重工"
          },
          "maintenanceUnits": [
            {
              "name": "水力系统"
            },
            {
              "name": "液压系统"
            },
            {
              "name": "泡沫系统"
            }
          ]
        },
        {
          "maintNo": "20170710003",
          "name": "举高喷射消防车车身保养",
          "equipmentBigType": {
            "etCnName": "举高类消防车"
          },
          "equipmentMinType": {
            "etCnName": "举高喷射消防车",
            "bigImagePath": "/images/JGPS.png"
          },
          "equipmentBrand": {
            "cnName": "三一重工"
          },
          "maintenanceUnits": [
            {
              "name": "发动机"
            },
            {
              "name": "底盘"
            },
            {
              "name": "方向盘"
            }
          ]
        },
        {
          "maintNo": "20170710004",
          "name": "举高喷射消防车辅助系统保养",
          "equipmentBigType": {
            "etCnName": "举高类消防车"
          },
          "equipmentMinType": {
            "etCnName": "举高喷射消防车",
            "bigImagePath": "/images/JGPS.png"
          },
          "equipmentBrand": {
            "cnName": "三一重工"
          },
          "maintenanceUnits": [
            {
              "name": "空调系统"
            },
            {
              "name": "音响系统"
            }
          ]
        }
      ]
    })
    console.log(this.data.proArray)

    // var that = this
    // wx.request({
    //   url: getApp().request_host+'plan_list.json',
    //   data: {
    //     'currentPage': that.data.currentPage,
    //     'pageSize': that.data.pageSize
    //   },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   method: 'GET',
    //   dataType: '',
    //   success: function (res) {
    //     var list = that.data.proArray.concat(res.data.datas);
    //     var _currentPage = res.data.page.currentPage + 1;
    //     var _isEnd = res.data.page.total<res.data.page.pageSize;
    //     that.setData({
    //       proArray: list,
    //       currentPage: _currentPage,
    //       isEnd: _isEnd
    //     })
    //   },
    //   fail: function (res) {
    //     console.log(res)
    //   },
    //   complete: function(res) {
    //     wx.hideLoading();
    //   }
    // })
  }
})