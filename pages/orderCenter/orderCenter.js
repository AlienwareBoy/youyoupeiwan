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
    swiperIndex: 0,
    clickIndex: 10,
    DotsList: [{
      text: '正在抢单',
      status: 10,
    }, {
      text: '成功订单',
      status: 12,
    }, {
      text: '抢单失败',
      status: 14,
    }, {
      text: '历史订单',
      status: 0,
    }],
    form: {
      "status": "10",
      "page": 1,
      "pageSize": 10
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(10);
  },
  getData(status, page = 1) {
    $ajax.post(orderList, {
      status,
      page,
      pageSize: 20
    }).then(res => {
      this.setData({
        itemList: res.data.data,
      })
    })
  },
  changeClickIndex(e) {
    this.setData({
      clickIndex: e.detail.current
    })
  },
  choiceDots(e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.index
    })
    this.getData(this.data.clickIndex);
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