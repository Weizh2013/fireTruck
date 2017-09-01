// proDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    proNum: '编号',
    proName: '保养计划',
    proCategory: '类别',
    proParts: ['部件'],
    proBrand: '品牌',
    imageUrl: '/images/default.png',
    infoArray: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var info = JSON.parse(option.info);
    // 整理部件名称数据
    var parts = info.maintenanceUnits;
    var _proParts = [];
    for(var i=0;i<parts.length;i++) {
      _proParts.push(parts[i].name);
    }
    // 筛选有效类名，优先小类名，如果小类名为空，则启用大类名
    var _proCategory = info.equipmentMinType.etCnName;
    if (_proCategory == '' || _proCategory == null) {
      _proCategory = info.equipmentBigType.etCnName;
    }
    
    this.setData ({
      proNum: info.maintNo,
      proName: info.name,
      proCategory: _proCategory,
      proParts: _proParts,
      proBrand: info.equipmentBrand.cnName,
      imageUrl: info.equipmentMinType.bigImagePath
    })

    this.setData({
      infoArray: [{
        "key": "计划编号",
        "value": this.data.proNum
      }, {
        "key": "计划名称",
        "value": this.data.proName
      }, {
        "key": "车辆种类",
        "value": this.data.proCategory
      }, {
        "key": "品牌",
        "value": this.data.proBrand
      }, {
        "key": "保养部件",
        "value": this.data.proParts
      }]
    })
  }
})