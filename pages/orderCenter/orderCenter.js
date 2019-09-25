import {
  $ajax
} from '../../utils/request'
import {
  orderList
} from '../../utils/api'
import {
  Toast
} from '../../utils/miniappPromise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: '',
    clickIndex: 10,
    DotsList: [{
      text: '正在抢单',
      status: 10,
    }, {
      text: '成功订单',
      status: 14,
    }, {
      text: '历史订单',
      status: 0,
    }],
    form: {
      "status": 10,
      "page": 1,
      "pageSize": 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(this.data.form);
  },
  getData(form) {
    $ajax.post(orderList, form).then(res => {
      this.setData({
        itemList: res.data.data,
      })
    })
  },
  changeClickIndex(e) {
    let status = 10;
    let clickIndex = this.data.clickIndex;
    switch (e.detail.current) {
      case 0:
        status = 10;
        break;
      case 1:
        status = 14;
        break;
      case 2:
        status = 0;
        break;
    }
    this.data.form.status = status;
    this.setData({
      currentIndex: e.detail.current,
      clickIndex: status
    })
    this.getData(this.data.form);
  },
  choiceDots(e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.status
    })
    this.data.form.status = e.currentTarget.dataset.status;
    this.getData(this.data.form);
  },
  getPhone(e) {
    let {
      phone
    } = e.currentTarget.dataset;
    wx.setClipboardData({
      data: phone,
      success(res) {
        wx.getClipboardData({
          success(res) {
            Toast('已复制联系方式')
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})