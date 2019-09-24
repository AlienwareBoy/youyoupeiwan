import {
  $ajax
} from '../../../utils/request'
import {
  extractPayLogHistory,
  optionPayLogHistory,
  agreeApply
} from '../../../utils/api'
import {
  Model,
  Toast
} from '../../../utils/miniappPromise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeFont: '充值',
    formgameManage: {
      userImage: '',
      userPirce: '',
    },
    operating: 0, //0充值，1 提现
    successForm: {
      "userId": '',
      "page": 1,
      "pageSize": 10,
      "status": 0
    },
    pickerList: ['充值', '提现'],
    extractForm: {

    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      'formgameManage.userName': options.userName,
      'formgameManage.price': options.price,
      'formgameManage.userImage': options.userImage,
      'successForm.userId': options.userId,
    })
    this.optionPayLogHistory();
  },
  bindPickerChange: function(e) {
    Boolean(e.detail.value) ? this.extractPayLogHistory() : this.optionPayLogHistory()
    console.log(Boolean(e.detail.value))
    this.setData({
      typeFont: Boolean(e.detail.value) ? '提现' : '充值',
      operating: Boolean(e.detail.value) ? 1 : 0
    })
  },
  optionPayLogHistory() {
    $ajax.post(optionPayLogHistory, this.data.successForm).then(res => {
      console.log(res)
      this.setData({
        typeList: res.data.data,
        operating: 0
      })
    })
  },
  extractPayLogHistory() {
    $ajax.post(extractPayLogHistory, this.data.successForm).then(res => {
      console.log(res)
      this.setData({
        typeList: res.data.data,
        operating: 1
      })
    })
  },
  checkOperating(e) {
    // console.log(e)
    let {
      id
    } = e.currentTarget.dataset;
    Model('温馨提醒', `确认该笔操作已完成?`).then(res => {
      $ajax.post(agreeApply, {
        status: this.data.operating === 1 ? 0 : 1,
        id
      }).then(res => {
        this.data.operating ? this.extractPayLogHistory() : this.optionPayLogHistory()
        Toast('该笔操作已确认')
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