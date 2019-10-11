import {
  $ajax
} from '../../utils/request'
import {
  login,
  register,
  imgUpload,
  queryCateGory,
  parenIdQuery
} from '../../utils/api'
import {
  uploadFile,
  chooseImage,
  wxLogin,
  Toast
} from '../../utils/miniappPromise.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isMan: 3,
    invitationCode: '', //邀请码
    code: '', //微信code
    gameList: '',
    GradeList: '',
    checkcForm: {
      wechatId: '',
      wxAppId: 'wxd446f43a6a08e559',
      userName: '', //账号名
      nick: '', //微信昵称
      password: '', //密码
      phone: '', //电话
      gender: '', //性别
      payCodeUrl: '', //收款码
      cateId: '', //游戏ID
      cateName: '', //游戏名称
      level: '', //段位名称
      levelId: '', //段位ID
      headImg: '',
    },
  },
  writeInput(e) {
    let {
      type
    } = e.currentTarget.dataset;
    if (type === 'password') {
      if (e.detail.value.length < 6) {
        Toast('密码 长度需大于6位')
      }
    } else if (/^1([38]\d|4[5-9]|5[0-35-9]|6[56]|7[0-8]|9[189])\d{8}$/.test(e.detail.value)) {} else {
      Toast('请输入正确的手机号码')
    }
    this.setData({
      [`checkcForm.${type}`]: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    if (options.shareId !== "undefined") {
      console.log(1)
      this.setData({
        'invitationCode': options.shareId
      })
    }
  },
  openCode() {
    this.popBottom = this.selectComponent('#seeCode')
    this.popBottom.show()
  },
  onShow: function() {
    this.init();
    this.getGame();
  },
  getGame() {
    $ajax.post(queryCateGory).then(res => {
      console.log(res)
      this.setData({
        gameList: res.data.data
      })
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
  getGrade: function(e) {
    let item = this.data.GradeList.filter((item, index) => index === +e.detail.value)
    this.setData({
      'checkcForm.levelId': item[0].cateId,
      'checkcForm.level': item[0].cateName,
    })
  },
  bindPickerChange: function(e) {
    let item = this.data.gameList.filter((item, index) => index === +e.detail.value)
    this.getGradeList(item[0].cateId)
    this.setData({
      'checkcForm.cateId': item[0].cateId,
      'checkcForm.cateName': item[0].cateName,
    })
  },
  init() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo'),
      'checkcForm.gender': wx.getStorageSync('userInfo').gender,
      'isMan': wx.getStorageSync('userInfo').gender,
      'checkcForm.nick': wx.getStorageSync('userInfo').nickName,
      'checkcForm.headImg': wx.getStorageSync('userInfo').avatarUrl,
    })
  },
  choiceGender(e) {
    const {
      type
    } = e.currentTarget.dataset;
    this.setData({
      isMan: +type
    })
  },
  checkForm(params) {
    let flag = true;
    for (var key in params) {
      if (params[key] != '0' && !params[key]) {
        wx.showModal({
          title: '温馨提示',
          content: '请填写完整',
          showCancel: false
        })
        return false; // 终止程序
      }
    }

    return flag;
  },
  registered(e) {
    let result = this.checkForm(this.data.checkcForm);
    if (result) {
      console.log(e)
      wxLogin().then(res => {
        let data = Object.assign({}, this.data.checkcForm, {
          invitationCode: this.data.invitationCode
        }, {
          code: res.code
        });
        $ajax.post(register, data).then(res => {
          wx.setStorageSync('token', res.data.data.token)
        }).then(res => {
          console.log('registerCode', res)
          $ajax.post(login, {
            userName: this.data.checkcForm.userName,
            password: this.data.checkcForm.password
          }).then(res => {
            wx.setStorageSync('userObj', res.data.data)
            wx.switchTab({
              url: '../userManager/userManager',
            })
          })
        })
      })
    }
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
            'checkcForm.payCodeUrl': imgList[0].url
          })
        })
      }
    })
  },
})