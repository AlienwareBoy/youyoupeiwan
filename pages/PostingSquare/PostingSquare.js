import {
  $ajax
} from '../../utils/request'
import {
  postCenter
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSeeJoiner: true,
    // swiperIndex: 0,
    clickIndex: 0,
    itemList: [],
    form: {
      "status": 10,
      "page": 1,
      "pageSize": 10
    },
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
    this.getData();
  },
  getData() {
    $ajax.post(postCenter, this.data.form).then(res => {
      console.log(res)
      this.setData({
        itemList: res.data.data
      })
      console.log(this.data.itemList)
    })
  },
  toDetails(e) {
    wx.navigateTo({
      url: `../orderDetails/orderDetails?id=${e.currentTarget.dataset.id}&isSeeJoiner=${this.data.isSeeJoiner}`,
    })
  },
  changeClickIndex(e) {
    console.log(e.detail.source)
    this.setData({
      clickIndex: e.detail.source
    })
  },
  choiceDots(e) {
    console.log(e.currentTarget.dataset.index)
    this.setData({
      'form.status': e.currentTarget.dataset.status,
      clickIndex: e.currentTarget.dataset.index,
      // swiperIndex: e.currentTarget.dataset.index,
    })
    this.getData()
  },
})