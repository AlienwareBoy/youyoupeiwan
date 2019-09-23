import {
  $ajax
} from '../../utils/request'
import {
  postList,
  queryCateGory,
  parenIdQuery
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choiceGameIndex: '',
    choiceGradeIndex: '',
    showSearch: false,
    showMask: false,
    clickIndex: '2', //当前显示
    form: {
      "page": 1,
      "pageSize": 20,
      "fristPrice": "",
      "lastPrice": "",
      "fristAge": "",
      "lastAge": "",
      "levelId": "",
      "cateId": ""
    },
    searchList: [{
      text: '价格'
    }, {
      text: '年龄'
    }, {
      text: '游戏分类'
    }, {
      iconfont: 'iconshaixuan1',
      text: '筛选'
    }],
  },
  onShow(e) {
    this.getData();
    this.getGame()
  },
  getData() {
    $ajax.post(postList, this.data.form).then(res => {
      this.setData({
        itemList: res.data.data
      })
    })
  },
  choiceGame(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.getGradeList(id);
    this.setData({
      choiceGameIndex: id,
      'form.cateId': id
    })
  },
  choiceGrade(e) {
    const {
      id
    } = e.currentTarget.dataset;
    this.setData({
      choiceGradeIndex: id,
      'form.levelId': id
    })
  },
  reset() {
    let form = this.data.form;
    for (let key in form) {
      form[key] = ""
    }
    form.page=1;
    form.pageSize=20;
    this.setData({
      form,
      'choiceGameIndex': '',
      'choiceGradeIndex': ''
    })
  },
  getValue(e) {
    const {
      type
    } = e.currentTarget.dataset;
    this.setData({
      [`form.${type}`]: e.detail.value
    })
  },
  toDetail(e) {
    const {
      id
    } = e.currentTarget.dataset;
    console.log(id)
    wx.navigateTo({
      url: `../orderDetails/orderDetails?id=${id}`,
    })
  },
  openSearch(e) {
    if (e.currentTarget.dataset.index === 3) return
    setTimeout(() => {
      this.setData({
        showSearch: true
      })
    }, 100)
    this.setData({
      showMask: true
    })
    this.setData({
      clickIndex: e.currentTarget.dataset.index
    })
  },
  getGame() {
    $ajax.post(queryCateGory).then(res => {
      console.log(res)
      this.setData({
        gameList: res.data.data
      })
    })
  },
  getGrade: function(e) {
    let item = this.data.GradeList.filter((item, index) => index === +e.detail.value)
    this.setData({
      'userInfo.levelId': item[0].cateId,
      'userInfo.level': item[0].cateName,
    })
  },
  getGradeList(parentId) {
    // let item = this.data.GradeList.filter((item, index) => index === +e.detail.value)
    $ajax.post(parenIdQuery, {
      parentId
    }).then(res => {
      console.log(res)
      this.setData({
        GradeList: res.data.data
      })
    })
  },
  closeSearch() {
    setTimeout(() => {
      this.getData();
      this.setData({
        showMask: false
      })
    }, 100)
    this.setData({
      showSearch: false
    })
  },
})