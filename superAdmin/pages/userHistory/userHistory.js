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
import {
  debounce
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeFont: '充值',
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
    $ajax.post(`${optionPayLogHistory}?token=${wx.getStorageSync('token')}`, this.data.successForm).then(res => {
      console.log(res)
      let userInfo={
        headImg: res.data.data.headImg,
        money: res.data.data.money,
        userId: res.data.data.userId,
        userName: res.data.data.userName
      }
      this.setData({
        typeList: res.data.data.chargeDto,
        userInfo,
        operating: 0
      })
    })
  },
  extractPayLogHistory() {
    $ajax.post(`${extractPayLogHistory}?token=${wx.getStorageSync('token')}`, this.data.successForm).then(res => {
      console.log(res)
      this.setData({
        typeList: res.data.data,
        operating: 1
      })
    })
  },
  checkOperating: debounce(function(e) {
    let {
      id
    } = e.currentTarget.dataset;
    Model('温馨提醒', `确认该笔操作已完成?`).then(res => {
      $ajax.post(`${agreeApply}?token=${wx.getStorageSync('token')}`, {
        status: this.data.operating === 1 ? 0 : 1,
        id
      }).then(res => {
        this.data.operating ? this.extractPayLogHistory() : this.optionPayLogHistory()
        Toast('该笔操作已确认')
      })
    })
  }, 500),
})