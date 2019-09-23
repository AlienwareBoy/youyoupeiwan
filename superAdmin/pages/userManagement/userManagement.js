import {
  Model,
  Toast
} from '../../../utils/miniappPromise.js'
import {
  usermanage
} from '../../../utils/api.js'
import {
  $ajax
} from '../../../utils/request.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowMoney: '',
    popupState: 1,
    popupTitle: '余额调整',
    PermissionList: [{
        name: '0',
        value: '发帖',
        checked: false,
      },
      {
        name: '1',
        value: '抢单',
        checked: false,
      },
      {
        name: '2',
        value: '封号',
        checked: false,
      },
      {
        name: '3',
        value: '提前解封',
        checked: false,
      }
    ],
    form: {
      "userName": "",
      "page": 1,
      "pageSize": 10
    },
    nowList: [],
    index: 0,
    array: ['用户详情', '提现/充值历史', '用户等级设置','用户封号处理']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  getData() {
    $ajax.post(usermanage, this.data.form).then(res => {
      this.setData({
        itemList: res.data.data
      })
    })
  },
  checkboxChange: function(e) {
    let list = this.data.nowList.push(...e.detail.value);
    let list2 = this.data.PermissionList;
    this.setData({
      PermissionList: list2,
      nowList: this.data.nowList
    })
  },
  choiceClick(e) {
    let {
      index
    } = e.currentTarget.dataset;
    this.data.PermissionList[index].checked = !this.data.PermissionList[index].checked;
    this.checkAll(this.data.PermissionList, this.data.PermissionList[index].value, index);
  },
  checkAll(list, value, index) {
    for (let i = 0; i < list.length; i++) {
      if (list[index].value == '封号' && list[index].checked || list[index].value == '提前解封' && list[index].checked) {
        list[i].checked = false;
        list[index].checked = true;
      }
    }

    this.setData({
      PermissionList: list
    })
  },
  bindPickerChange(e) {
    switch (e.detail.value) {
      case '0':
        wx.navigateTo({
          url: `../../../pages/userInfo/userInfo?isShowJoin=0`
        })
        break
      case '1':
        wx.navigateTo({
          url: `../../../superAdmin/pages/userHistory/userHistory`
        })
        break
      case '2':
        this.popBottom = this.selectComponent('#popBottom')
        this.popBottom.closePopup()
        break
    }
    this.setData({
      popupTitle: this.popupTitle,
      popupState: this.popupState
    })
  },
  checkMoney(e) {
    this.setData({
      nowMoney: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})