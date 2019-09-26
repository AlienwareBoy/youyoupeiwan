import {
  $ajax
} from '../../../utils/request'
import {
  imgUpload,
  addCate
} from '../../../utils/api'
import {
  chooseImage,
  uploadFile,
  Toast
} from '../../../utils/miniappPromise'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowImage: false,
    isShowImage: false,
    form: {
      cateName: '',
      parentName: '',
      cateUrl: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  createGame(e) {
    $ajax.post(`${addCate}?token=${wx.getStorageSync('token')}`, this.data.form).then(res => {
      Toast('创建成功')
    })
  },
  getValue(e) {
    let {
      type
    } = e.currentTarget.dataset;
    this.setData({
      [`form.${type}`]: e.detail.value
    })
  },
  showTexttarea(e) {
    this.setData({
      isShowTextarea: !this.data.showTexttarea
    })
  },
  showImage() {
    this.setData({
      isShowImage: !this.data.isShowImage
    })
  },
  uploadImage() {
    chooseImage().then(res => {
      return res.tempFilePaths
    }).then(res => {
      if (res.length >= 2) {
        console.log('我进来了')
        wx.showToast({
          title: `一次最多上传1张图片！`,
          icon: 'none'
        })
      } else {
        let List = [];
        wx.showLoading({
          title: '图片上传中...',
        })
        for (let i = 0; i < res.length; i++) {
          List[i] = uploadFile(imgUpload, res[i])
        }
        Promise.all(List).then(res => {
          wx.hideLoading()
          let imgList = [];
          for (let i = 0; i < res.length; i++) {
            let parseData = JSON.parse(res[i].data);
            console.log(imgList)
            imgList.push({
              url: parseData.data.url
            })
          }
          console.log(imgList)
          this.setData({
            'form.cateUrl': imgList[0].url
          })
        })
      }
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