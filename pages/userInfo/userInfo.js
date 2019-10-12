import {
  $ajax
} from '../../utils/request'
import {
  getUserData,
  editUser,
  imgUpload,
  queryCateGory,
  parenIdQuery,
  update_user,
  queryUser
} from '../../utils/api'
import {
  uploadFile,
  chooseImage,
  Toast
} from '../../utils/miniappPromise.js'
Page({
  data: {
    array: ['男', '女'],
    isEdit: false,
    isAdmin: false,
    adminForm: {
      userName: '',
      headImg: '',
      userId: ''
    },
    userForm: {
      name: '与君威',
      phone: '13922289159',
      gender: '男',
      wx: '我是张三',
      codeImg: '',
      wx: 'liuming123'
    }
  },
  onLoad(e) {
    console.log(e)
    //如果isfrom为true说明来自首页,再判断用户身份，如果是会员可以修改全部，调用普通会员的保存接口，如果是超管且isfrom为false就调用普通会员的保存接口，如果isfrom为false则调用超管的
    this.setData({
      isfrom: e.isfrom === 'false' ? false : true,
      userId: e.id,
      isAdmin: Number(e.isAdmin)
    })
    this.getUserId(e.id)
  },
  getUserId(userId) {
    console.log(userId)
    $ajax.post(`${queryUser}?token=${wx.getStorageSync('token')}`, {
      userId
    }).then(res => {
      this.setData({
        gender_sex: res.data.data.gender === '1' ? '男' : '女',
        userInfo: res.data.data,
        'adminForm.headImg': res.data.data.headImg,
        'adminForm.userId': userId,
      })
      this.getGradeList(res.data.data.cateId)
    })
  },
  openCode() {
    this.popBottom = this.selectComponent('#seeCode')
    this.popBottom.show()
  },
  checkInfo() {
    if (this.data.isfrom) {
      //来自正常进入
      $ajax.post(`${editUser}?token=${wx.getStorageSync('token')}`, this.data.userInfo).then(res => {
        Toast('保存成功')
        this.setData({
          isEdit: false
        })
      }).then(res => {
        this.getUserId(this.data.userId)
      })
    } else if (!this.data.isfrom && this.data.isAdmin === 30) {
      $ajax.post(`${update_user}?token=${wx.getStorageSync('token')}`, this.data.adminForm).then(res => {
        Toast('保存成功')
        this.setData({
          isEdit: false
        })
      }).then(res => {
        this.getUserId(this.data.userId)
      })
    }

  },
  getGame() {
    $ajax.post(queryCateGory).then(res => {
      console.log(res)
      this.setData({
        gameList: res.data.data
      })
    })
  },
  AdminGetName(e) {
    this.setData({
      'adminForm.userName': e.detail.value
    })
  },
  changeSex: function(e) {
    console.log(e.detail.value)
    this.setData({
      gender_sex: e.detail.value === '0' ? '男' : '女',
      'userInfo.gender': e.detail.value === '0' ? '0' : '1'
    })
  },
  EditFalse() {
    this.setData({
      isEdit: false
    })
  },
  bindPickerChange: function(e) {
    let item = this.data.gameList.filter((item, index) => index === +e.detail.value)
    this.getGradeList(item[0].cateId)
    this.setData({
      'userInfo.cateId': item[0].cateId,
      'userInfo.cateName': item[0].cateName,
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
  checkgame(e) {
    const {
      index
    } = e.currentTarget.dataset
    this.setData({
      gameIndex: this.data.gameList[index].cateId
    })
    this.getGradeList(this.data.gameList[index].cateId);
  },

  edit() {
    this.setData({
      isEdit: !this.data.isEdit
    })
    this.getGame()
  },
  getName(e) {
    this.setData({
      "userForm.name": e.detail.value
    })
  },
  getPhone(e) {
    this.setData({
      "userForm.phone": e.detail.value
    })
  },
  getGender(e) {
    this.setData({
      "userForm.gender": e.detail.value
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
          if (!this.data.isfrom && this.data.isAdmin === 30) {
            // 超管
            this.setData({
              'adminForm.headImg': imgList[0].url
            })
          } else {
            // 用户
            this.setData({
              'userInfo.payCodeUrl': imgList[0].url
            })
          }

        })
      }
    })
  },
  editFalse() {
    this.setData({
      isEdit: false
    })
  },
  getWx(e) {
    this.setData({
      "userForm.wx": e.detail.value
    })
  }
})