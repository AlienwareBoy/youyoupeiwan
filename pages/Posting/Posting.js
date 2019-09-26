import {
  $ajax
} from '../../utils/request'
import {
  productPost,
  queryCateGory,
  parenIdQuery
} from '../../utils/api'
import {
  Toast
} from '../../utils/miniappPromise'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowClickGame: '请选择',
    nowClickGrade:'请选择',
    isshowTextarea: false,
    form: {
      "levelId": "", //游戏等级ID
      "level": "", //等级名
      "cateName": "", //游戏名 
      "cateId": "", //游戏ID
      "cateUrl":"", //游戏封面
      "age": '', //年龄
      "gender": "", //性别
      "price": '', //价格
      "remark": "", //备注
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGame();
  },
  check(){
    console.log(productPost)
    $ajax.post(`${productPost}?token=${wx.getStorageSync('token')}`,this.data.form).then(res=>{
      console.log(res)
      Toast('发帖成功').then(res=>{
        wx.navigateBack(-1)
      })
    })
  },
  checkGender(e){
    const { type } = e.currentTarget.dataset;
    this.setData({
      'form.gender':+type
    })
  },
  getValue(e){
    const { type } = e.currentTarget.dataset;
    this.setData({
      [`form.${type}`]: e.detail.value
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
  bindPickerChange: function(e) {
    let item = this.data.gameList.filter((item, index) => index === +e.detail.value)
    this.getGradeList(item[0].cateId)
    this.setData({
      'nowClickGame': item[0].cateName,
      'form.cateId': item[0].cateId,
      'form.cateName': item[0].cateName,
      'form.cateUrl': item[0].cateUrl,
    })
  },
  getGrade: function (e) {
    let item = this.data.GradeList.filter((item, index) => index === +e.detail.value)
    this.setData({
      'nowClickGrade': item[0].cateName,
      'form.levelId': item[0].cateId,
      'form.level': item[0].cateName,
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
  showNote(e) {
    console.log(e)
    this.setData({
      isshowTextarea: true
    })
  },
})