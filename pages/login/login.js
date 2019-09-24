import {
  $ajax
} from '../../utils/request'
import {
  login,
  register,
  auth
} from '../../utils/api'
Page({
  data: {
    form: {
      username: "",
      password: ""
    },
    registeredForm: {
      regName: '',
      regPassword: '',
      checkpassword: "",
    },
    isLogin: false,
    upNum: 0,
    current: 0,
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad(e) {
    this.setData({
      shareId: e.shareId
    })
  },
  onShow() {},
  currentAdd(e) {
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      this.setData({
        current: 1
      })
    }

  },
  LoginMove() {
    return false
  },
  toReg(e) {
    console.log(e)
    if (e.detail.userInfo) {
      wx.setStorageSync('userInfo', e.detail.userInfo)
      wx.navigateTo({
        url: `../registered/registered?shareId=${this.data.shareId}`
      })
    }
  },
  toRegPage() {
    wx.navigateTo({
      url: `../registered/registered?shareId=${this.data.shareId}`
    })
  },
  getuserName(e) {
    this.setData({
      "form.username": e.detail.value
    })
  },
  setpassword(e) {
    this.setData({
      "registeredForm.regPassword": e.detail.value
    })
  },
  checkpassword(e) {
    const {
      regPassword
    } = this.data.registeredForm;
    let checkpassword = e.detail.value;
    if (checkpassword !== regPassword) {
      wx.showToast({
        title: '再次输入密码有误',
        icon: 'success',
        duration: 2000
      })
      this.setData({
        "registeredForm.checkpassword": ""
      })
      return
    } else {
      this.setData({
        "registeredForm.checkpassword": checkpassword
      })
    }
  },
  setuserName(e) {
    this.setData({
      "registeredForm.regName": e.detail.value
    })
  },
  checkForm() {
    const {
      regName,
      regPassword,
      checkpassword
    } = this.data.registeredForm;
    regName && regPassword && checkpassword !== "" ? wx.showToast({
      title: '填写完整',
      icon: 'success',
      duration: 2000
    }) : wx.showToast({
      title: '请填写完整',
      icon: 'none',
      duration: 2000
    })
  },
  getpassWord(e) {
    this.setData({
      "form.password": e.detail.value
    })
  },
  userLogin() {
    const {
      username,
      password
    } = this.data.form;
    if (username && password !== "") {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      $ajax.post(login, {
        userName: username,
        password,
      }).then(res => {
        wx.setStorageSync('userObj', res.data.data)
        console.log(res.data.data.token)
        wx.setStorageSync('token', res.data.data.token)
        wx.switchTab({
          url: `../userManager/userManager`,
        })
      })
    } else {
      wx.showToast({
        title: '请输入账号密码',
        icon: "none",
        duration: 2000
      })
    }
  }

})