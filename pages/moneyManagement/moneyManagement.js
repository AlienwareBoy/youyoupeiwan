import {
  Model,
  Toast
} from '../../utils/miniappPromise.js'
import {
  paylogManage,
  optionPayLog,
  extractPayLog
} from '../../utils/api.js'
import {
  $ajax
} from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    money: '',
    PopupTitle: '请选择提现金额',
    nowSelectTitle: '全部交易类型',
    ModelType: 1,
    num: '',
    closePopup: false,
    isChoice: null,
    showMask: false,
    typeList: [{
      value: 0,
      text: '全部'
    }, {
      value: 10,
      text: '发帖'
    }, {
      value: 12,
      text: '提现'
    }, {
      value: 14,
      text: '抢单成功'
    }, {
      value: 20,
      text: '充值'
    }],
    priceList: [{
      text: 50
    }, {
      text: 100
    }, {
      text: 200
    }],
    form: {
      type: 0,
      page: 1,
      pageSize: 20
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData();
    this.setData({
      money: options.money
    })
  },
  getData() {
    $ajax.post(`${paylogManage}?token=${wx.getStorageSync('token')}`, this.data.form).then(res => {
      this.setData({
        itemList: res.data.data
      })
    })
  },
  review() {
    let type = this.data.ModelType; ///1充值  2提现
    if (!this.data.num) {
      Toast('请选择提现金额')
    } else {
      let title = type === 1 ? '确认充值' : '确认提现';
      let content = type === 1 ? `确认充值${this.data.num}元?` : `确认提现${this.data.num}元?`
      Model(title, content).then(res => {
        type === 1 ? this.setMoney(this.data.num) : this.putMoney(this.data.num);
        this.closeMask()
      })
    }
  },
  setMoney(price) {
    $ajax.post(`${optionPayLog}?token=${wx.getStorageSync('token')}`, { price}).then(res => {
      Toast('已发送充值提醒')
    })
  },
  putMoney(price) {
    $ajax.post(`${extractPayLog}?token=${wx.getStorageSync('token')}`, { price}).then(res => {
      Toast('已发送提现提醒')
    })
  },
  choicePrice(e) {
    this.setData({
      num: +this.data.priceList[e.currentTarget.dataset.index].text,
      isChoice: e.currentTarget.dataset.index
    })
  },
  closeMask(e) {
    let {
      closePopup,
      showMask
    } = this.data;
    closePopup = false;
    showMask = true;
    this.setData({
      closePopup,
    })
    setTimeout(() => {
      console.log('---')
      this.setData({
        showMask: false
      })
    }, 300)
  },
  getMoney(e) {
    const {
      type
    } = e.currentTarget.dataset;
    let {
      closePopup,
      showMask
    } = this.data;
    setTimeout(() => {
      let PopupTitle = this.data.PopupTitle;
      if (+type === 1) {
        PopupTitle = '请选择充值金额'
        this.data.ModelType = 1;
      } else if (+type === 2) {
        PopupTitle = '请选择提现金额'
        this.data.ModelType = 2;
      }
      closePopup = true;
      this.setData({
        ModelType: this.data.ModelType,
        closePopup,
        PopupTitle
      })
    }, 300)
    showMask = true;
    this.setData({
      showMask: true,
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