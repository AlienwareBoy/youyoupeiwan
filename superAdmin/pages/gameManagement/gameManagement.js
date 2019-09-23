import {
  $ajax
} from '../../../utils/request'
import {
  queryCateGory,
  parenIdQuery,
  optionCategory,
  addlevel
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
    isShowPopup: false,
    closePopup: false,
    gradeIndex: '',
    gameIndex: '',
    isClickIndex: 0,
    inputValue: '',
    isEdit: false,
    PopupTitle: '添加游戏 ',
    placeholder: '请输入游戏名字',
  },
  onLoad: function(options) {
    this.getData()
  },
  checkgame(e) {
    const {
      index
    } = e.currentTarget.dataset
    if (this.data.isEdit) {
      Model('温馨提示', '是否删除这个游戏,该操作不可逆?').then(res => {
        $ajax.post(optionCategory, {
          cateId: this.data.gameList[index].cateId
        }).then(res => {
          Toast('删除成功')
          this.getData()
        })
      })
    } else {
      this.getGradeList(this.data.gameList[index].cateId);
      this.setData({
        gameIndex: this.data.gameList[index].cateId
      })
    }
  },
  checkGrade(e) {
    const {
      index
    } = e.currentTarget.dataset;
    if (this.data.isEdit) {
      Model('温馨提示', '是否删除这个分类?').then(res => {
        $ajax.post(optionCategory, {
          cateId: this.data.GradeList[index].cateId
        }).then(res => {
          Toast('删除成功')
          this.getData()
        })
      })
    } else {

      this.setData({
        gradeIndex: this.data.GradeList[index].cateId
      })
    }
  },
  getData() {
    $ajax.post(queryCateGory).then(res => {
      console.log(res)
      this.setData({
        gameList: res.data.data,
        gameIndex: res.data.data[0].cateId
      })
      this.getGradeList(res.data.data[0].cateId)
    })
  },
  getGradeList(parentId) {
    $ajax.post(parenIdQuery, {
      parentId
    }).then(res => {
      console.log(res.data.data)
      this.setData({
        GradeList: res.data.data
      })
    })
  },
  choiceIndex(e) {
    let GradeList = []
    GradeList = this.data.initList[e.currentTarget.dataset.index].gradeList
    this.setData({
      GradeList,
      isClickIndex: +e.currentTarget.dataset.index
    })
  },
  isEditStatus() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
  addGame() {
    wx.navigateTo({
      url: '../addGame/addGame',
    })
  },
  openGradeAdd() {
    this.popBottom = this.selectComponent('#popBottom')
    this.popBottom.openPopup()
  },
  checkValue() {
    let type = +this.data.type;
    !type ? this.addGameList(this.data.isClickIndex) :
      this.addGradeList()
  },
  addGameList(index) {
    this.data.gameList.push(this.data.inputValue)
    console.log(this.data.gameList)
    // return
    this.setData({
      gameList: this.data.gameList,
      isShowPopup: false
    })
  },
  getValue(e) {
    this.setData({
      GradeName: e.detail.value
    })
  },
  addGradeName() {
    let cateName = this.data.GradeName;
    $ajax.post(addlevel, {
      cateName,
      "parentId": this.data.gameIndex
    }).then(res => {
      Toast('创建等级成功');
      this.getData()
      this.popBottom = this.selectComponent('#popBottom')
      this.popBottom.closePopup()
    })
  },
  addGradeList(e) {},
  closePopup() {
    this.setData({
      isShowPopup: false
    })
  },
  checkName(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})