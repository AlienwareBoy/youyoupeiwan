import {
  $ajax
} from '../../../utils/request'
import {
  postCentreByAdmin
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
    isSearch: false,
    form: {
      "status": 10,
      "page": 1,
      "pageSize": 10,
      "userName": ""
    },
    swiperIndex: 0,
    clickIndex: 10,
    DotsList: [{
      text: '抢单中',
      status: 10
    }, {
      text: '正在联系',
      status: 12
    }, {
      text: '成功交易',
      status: 14
    }, {
      text: '全部',
      status: 0
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getData(this.data.form);
  },
  getValue(e) {
    let userName = e.detail.value;
    if (userName !== '') {
      console.log(e.detail.value)
      let obj = Object.assign({}, this.data.form, {
        userName
      });
      console.log(obj)
      this.getData(obj)
      this.setData({
        isSearch: true
      })
    } else {
      console.log(userName)
      this.setData({
        isSearch: false
      })
      this.getData(this.data.form)
    }

  },
  getData(form) {
    console.log(postCentreByAdmin)
    $ajax.post(`${postCentreByAdmin}?token=${wx.getStorageSync('token')}`, form).then(res => {
      this.setData({
        itemList: res.data.data
      })
    })
  },
  choiceDots(e) {
    this.setData({
      clickIndex: e.currentTarget.dataset.status
    })
    this.data.form.status = e.currentTarget.dataset.status;
    this.getData(this.data.form)
  },
  changeClickIndex(e) {
    let status = 10;
    let clickIndex = this.data.clickIndex;
    switch (e.detail.current) {
      case 0:
        status = 10;
        break;
      case 1:
        status = 12;
        break;
      case 2:
        status = 14;
        break;
      case 3:
        status = 0;
        break;
    }
    this.data.form.status = status;
    this.setData({
      clickIndex: status
    })
    this.getData(this.data.form);
  },
})