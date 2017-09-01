// maintainHis.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    readFlagDis: [{     // 未读时的显示状态
      display: 'block',
      color: 'black',
      weight: 'bolder'
    },{                 // 已读时的显示状态
      display: 'none',
      color: 'gray',
      weight: 'normal'
    }],

    recorderList: [],

    currentPage: 0,
    pageSize: 10,
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      recorderList: [],
      currentPage: 0,
      isEnd: false
    })
    this.getDatas(true)
  },

  /**
   * 某个记录被点击之后，进入详情查看页面
   */
  hisDetailClicked: function (event) {
    this.data.recorderList[event.currentTarget.dataset.index].readStau = 1;
    var currentInfo = JSON.stringify(this.data.recorderList[event.currentTarget.dataset.index]);
    wx.navigateTo({
      url: 'hisDetail/hisDetail?info=' + currentInfo,
      fail: function (res) {
        console.log(res);
      }
    })
  },

  /**
   * 下拉刷新回调函数
   */
  onPullDownRefresh: function () {
    this.setData({
      recorderList: [],
      currentPage: 0,
      isEnd: false
    })
    this.getDatas(true)
  },

  /**
   * 上拉获取更多回调
   */
  onReachBottom: function () {
    if (this.data.isEnd) {
      wx.showToast({
        title: '已拉到底'
      })
      return;
    } else {
      this.getDatas(false)
    }
  },

  /**
   * 请求页面数据
   */
  getDatas: function (isLoading) {
    this.setData({
      isEnd: true,
      recorderList: [
        {
          "vehicleNO": "湘A G2W63",
          "starttime": "2017-08-27T09:22:50.328Z",
          "status": 2,
          "endtime": "2017-08-29T09:22:50.328Z",
          "maintenancePlan": {
            "name": "举高喷射消防车全车保养",
            "equipmentMinType": {
              "imagePath": "/images/JGPS.png"
            }
          },
          "nextMaintTime": "2017-12-30T09:22:50.328Z",
          "maintRecNum": "201707100109900495",
          "enterpriseName": "黄兴中队",
          "dutyMans": [
            "魏宙辉",
            "黄焱煌"
          ],
          "maintMans": [
            "吴工",
            "林工"
          ]
        },
        {
          "vehicleNO": "湘A ZX318",
          "starttime": "2017-08-26T09:22:50.328Z",
          "status": 0,
          "endtime": "2017-08-29T09:22:50.328Z",
          "maintenancePlan": {
            "name": "举高喷射消防车车身保养",
            "equipmentMinType": {
              "imagePath": "/images/JGPS.png"
            }
          },
          "nextMaintTime": "2017-12-30T09:22:50.328Z",
          "maintRecNum": "201707100109900495",
          "enterpriseName": "黄兴中队",
          "dutyMans": [
            "谭永波",
            "卢帆"
          ],
          "maintMans": [
            "李工",
            "姚工"
          ]
        },

        {
          "vehicleNO": "湘A 31Z81",
          "starttime": "2017-08-25T09:22:50.328Z",
          "status": 0,
          "endtime": "2017-08-27T09:22:50.328Z",
          "maintenancePlan": {
            "name": "举高喷射消防车辅助系统保养",
            "equipmentMinType": {
              "imagePath": "/images/JGPS.png"
            }
          },
          "nextMaintTime": "2017-12-30T09:22:50.328Z",
          "maintRecNum": "201707100109900495",
          "enterpriseName": "黄兴中队",
          "dutyMans": [
            "黄焱煌",
            "卢帆"
          ],
          "maintMans": [
            "王工",
            "刘工"
          ]
        }
      ]






















    })

    this.getReadStatus();

    // if(isLoading) {
    //   wx.showLoading({
    //     title: '数据加载中',
    //     mask: true
    //   })
    // }
    // var that = this
    // wx.request({
    //   url: getApp().request_host + 'recorder_list.json',
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
    //     var list = that.data.recorderList.concat(res.data.datas);
    //     var _currentPage = res.data.page.currentPage + 1;
    //     var _isEnd = res.data.page.total < res.data.page.pageSize;
    //     that.setData({
    //       recorderList: list,
    //       currentPage: _currentPage,
    //       isEnd: _isEnd
    //     })
    //     that.getReadStatus();
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
   * 检测已读未读状态
   */
  getReadStatus: function() {
    var disArray = [];
    for (var i = 0; i < this.data.recorderList.length; i++) {
      var obj = {
        display: '',
        color: '',
        weight: ''
      };
      // obj.display = this.data.recorderList[i].readStau? 'none' : 'block';
      // obj.color = this.data.recorderList[i].readStau ? 'gray' : 'black';
      // obj.weight = this.data.recorderList[i].readStau ? 'normal' :'bolder';
      /** 暂时只做服务工程师一角色，不存在已读未读 */
      obj.display = 'none';
      obj.color = 'gray';
      obj.weight = 'normal';
      disArray.push(obj);
    }
    this.setData({
      readFlagDis: disArray
    });
  }
})