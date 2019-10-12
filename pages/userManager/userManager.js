import {
  $ajax
} from '../../utils/request'
import {
  mine,
  upgradeVip,
  File
} from '../../utils/api'
import {
  Toast
} from '../../utils/miniappPromise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showGetMoney: false,
    bgShow: 'https://yunlsc.oss-cn-qingdao.aliyuncs.com/34270afdbb5746feada20fa9666d9fde.png',
    userNameplate: '',
    showPopup: false,
    showShare: false,
    userObj: wx.getStorageSync('userObj'),
    showMask: false,
    userInfo: '',
    permissions: [{
      icon: '../../assets/images/HomePage_Triangle@2x.png',
      url: '../UserCode/UserCode',
      admin: '10,20,30',
      pathName: '会员收款',
      iconfont: ''
    }, {
      icon: '../../assets/images/HomePage_Square@2x.png',
      url: `../userInfo/userInfo?isfrom=true&isAdmin=${wx.getStorageSync('userObj').userType}&id=${wx.getStorageSync('userObj').userId}`,
      admin: '10,20,30',
      pathName: '编辑资料',
      iconfont: ''
    }, {
      icon: '../../assets/images/HomePage_Triangle@2x.png',
      url: '../../superAdmin/pages/gameManagement/gameManagement',
      admin: '30',
      pathName: '游戏管理',
      iconfont: ''
    }, {
      icon: '../../assets/images/HomePage_Square@2x.png',
      url: '../../superAdmin/pages/userManagement/userManagement',
      admin: '30',
      pathName: '用户管理',
      iconfont: ''
    }, {
      icon: '../../assets/images/Homepage_Round@2x.png',
      url: '../../superAdmin/pages/orderManagement/orderManagement',
      admin: '30',
      pathName: '订单管理',
      iconfont: ''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.getSystemInfo() //获取系统宽高
    // this.savaCanvas()

  },
  getkefu() {
    wx.setClipboardData({
      data: 'youyoupeiwan-kf',
      success(res) {
        wx.getClipboardData({
          success(res) {
            Toast('已复制客服微信,请添加客服微信', 'none', 1500)
          }
        })
      }
    })
  },
  closeMask(e) {
    setTimeout(() => {
      this.setData({
        showMask: false
      })
    }, 200)
    this.setData({
      showShare: false,
      showPopup: false,
      showGetMoney: false
    })
  },
  updateVip() {
    this.setData({
      showGetMoney: true
    })
  },
  openShare(e) {
    setTimeout(() => {
      this.setData({
        showShare: true
      })
    }, 200)
    this.setData({
      showMask: true
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    setTimeout(() => {
      this.userInfo();
    }, 1000)

  },
  getMoney() {
    wx.previewImage({
      current: 'https://youpw.oss-cn-shenzhen.aliyuncs.com/5e6cccfae6354436af0bd2f644c3ae13.png', // 当前显示图片的http链接
      urls: ['https://youpw.oss-cn-shenzhen.aliyuncs.com/5e6cccfae6354436af0bd2f644c3ae13.png'] // 需要预览的图片http链接列表
    })
    $ajax.post(`${upgradeVip}?token=${wx.getStorageSync('token')}`).then(res => {
      console.log('发送提醒')
    })
  },
  userInfo() {
    $ajax.post(`${mine}?token=${wx.getStorageSync('token')}`).then(res => {
      this.permissions(String(res.data.data.userType))
      this.setData({
        nowUser: res.data.data
      })
    })
  },
  userNameplate(userPermissions) {
    let userNameplate = ''
    if (userPermissions === '10') {
      userNameplate = '用户'
    } else if (userPermissions === '20') {
      userNameplate = 'VIP'
    } else {
      userNameplate = '超管'
    }
    return userNameplate
  },
  background(context, canvasWidth, canvasHeight) {
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, canvasWidth, canvasHeight); //背景
  },
  getSystemInfo() {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        let Math = (1334 / 750) * res.windowWidth;
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: Math
        })
      }
    })
  },
  rpx(rpx) {
    return parseInt((rpx / 750) * this.data.windowWidth)
  },
  // 生成canvas
  // savaCanvas(e) {
  //   let that = this;
  //   const context = wx.createCanvasContext('mycanvas');
  //   let bgShow = this.data.bgShow;
  //   wx.showLoading({
  //     title: '图片生成中',
  //   })
  //   // 返回一个SelectorQuery对象实例
  //   let query = wx.createSelectorQuery();
  //   // 节点的布局位置的查询请求，相对于显示区域，以像素为单位
  //   query.select('#mycanvas').boundingClientRect().exec((res) => {
  //     // 获取 canvas 宽高
  //     let canvasWidth = res[0].width;
  //     let canvasHeight = res[0].height;
  //     console.log(canvasWidth)
  //     console.log(canvasHeight)
  //     // // 绘制背景
  //     // 绘制与 canvas 画布等宽高的矩形
  //     context.setFillStyle('#fff');
  //     context.fillRect(0, 0, canvasWidth, canvasHeight);
  //     console.log(bgShow)
  //     Promise.all([File(bgShow)]).then(res => { 
  //       console.log(res)
  //       let token = wx.getStorageSync('token');
  //       let bgShow=this.data.bgShow;  //背景图
  //       context.drawImage(bgShow, this.rpx(40), this.rpx(174), this.rpx(670), this.rpx(670));
  //       context.draw(false, function () {
  //         wx.canvasToTempFilePath({
  //           x: 0,
  //           y: 0,
  //           width: canvasWidth,
  //           height: canvasHeight,
  //           canvasId: 'mycanvas',
  //           success: function (res) {
  //             let tempFilePath = res.tempFilePath;
  //             wx.saveImageToPhotosAlbum({
  //               filePath: tempFilePath,
  //               success(res) {
  //                 console.log('successImage',res)
  //                 wx.hideLoading()
  //                 wx.showToast({
  //                   title: '图片加载完毕',
  //                   icon: 'none',
  //                   duration: 1000
  //                 })
  //                 that.setData({
  //                   canvasSuccess: true,
  //                   ShopPopup: false,
  //                   ShowMask: false,
  //                 })
  //               },
  //               fail(res) {
  //                 wx.hideLoading();
  //                 that.setData({
  //                   ShopPopup: false,
  //                   ShowMask: false,
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       });

  //     })
  //   });
  // },
  permissions(userPermissions) {
    let userPath = userPermissions.split(","); //用户可以访问的路由
    this.data.permissions.forEach(item => {
      let nowArr = item.admin.split(','); //路由表规定的路由
      nowArr.includes(...userPath) ? item.toPath = true : item.toPath = false;
    })
    this.setData({
      permissions: this.data.permissions,
      userNameplate: this.userNameplate(userPermissions)
    })
  },
  saveImage() {
    setTimeout(() => {
      this.setData({
        showPopup: true
      })
    }, 200)
    this.setData({
      showMask: true,
      showShare: false
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '友友伴玩，一路成年',
      path: `/pages/login/login?shareId=${this.data.nowUser.invitationCode}`,
    }
  }
})