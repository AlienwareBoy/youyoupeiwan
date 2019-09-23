// superAdmin/pages/orderManagement/orderManagement.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clickIndex: 0,
    DotsList: [{
      text: '抢单中'
    }, {
      text: '正在联系'
    }, {
      text: '成功交易'
    }, {
      text: '全部'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  choiceDots(e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.index
    })
  },
  changeClickIndex(e) {
    this.setData({
      clickIndex: e.detail.current
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