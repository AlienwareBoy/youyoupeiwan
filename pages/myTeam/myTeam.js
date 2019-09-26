import {
  myteam
} from '../../utils/api.js'
import {
  $ajax
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      "page": 1,
      "pageSize": 10
    },
    itemList: [{
      name: '的说法',
      time: '2016'
    }, {
      name: '的说法',
      time: '2016'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData()
  },
  getData() {
    $ajax.post(`${myteam}?token=${wx.getStorageSync('token')}`, this.data.form).then(res => {
      this.setData({
        itemList: res.data.data
      })
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