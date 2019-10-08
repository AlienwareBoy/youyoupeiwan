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
    currentIndex: '',
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
    this.getData(this.data.form);
  },
  getData(form) {
    $ajax.post(`${postCenter}?token=${wx.getStorageSync('token')}`, form).then(res => {
      console.log(res)
      this.setData({
        isShowNextPage: res.data.page.next,
        itemList: res.data.data
      })
    })
  },
  toDetails(e) {
    wx.navigateTo({
      url: `../orderDetails/orderDetails?id=${e.currentTarget.dataset.id}&isSeeJoiner=${this.data.isSeeJoiner}`,
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
      clickIndex:e.detail.current
    })
    this.getData(this.data.form);
  },
  choiceDots(e) {
    let {
      index,
      status
    } = e.currentTarget.dataset;
    this.setData({
      'form.status': status,
      clickIndex: index,
    })
    this.data.form.status=status;
    this.getData(this.data.form)
  },
  onReachBottom(e) {
    if (!this.data.isShowNextPage) {
      Toast('已经到最后一页')
      return
    }
    this.data.form.page++;
    this.getData(this.data.form);
    this.setData({
      'form.page': this.data.page
    })
  }
})