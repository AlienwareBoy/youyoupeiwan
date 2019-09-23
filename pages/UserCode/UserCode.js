import {
  $ajax
} from '../../utils/request'
import {
  getUserData,
} from '../../utils/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payCode:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserData();
  },
  getUserData() {
    $ajax.post(getUserData).then(res => {
      console.log(res.data.data)
      this.setData({
        payCode: res.data.data.payCodeUrl
      })
    })
  },
  choiceImage(){
    let urls=[];
    urls.push(this.data.payCode)
    wx.previewImage({
      current: this.data.payCode, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  }
})