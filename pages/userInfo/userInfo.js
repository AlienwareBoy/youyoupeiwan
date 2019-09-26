import {
  $ajax
} from '../../utils/request'
import {
  getUserData,
  editUser,
  imgUpload,
  queryCateGory,
  parenIdQuery
} from '../../utils/api'
import {
  uploadFile,
  chooseImage,
  Toast
} from '../../utils/miniappPromise.js'
Page({
  data: {
    isShow: false,
    isEdit: false,
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
    if (!+e.isShowJoin) {
      this.setData({
        isShow: false,
      })
    }
    if (Boolean(e.isEdit) && Boolean(e.isShow)) {
      this.setData({
        isShow: true,
        isEdit: true
      })
    }
    if(e.id!==''){

    }else{
      this.getData();
    }
    
  },
  getData() {
    $ajax.post(`${getUserData}?token=${wx.getStorageSync('token')}`).then(res => {
      this.setData({
        userInfo: res.data.data
      })
      this.getGradeList(res.data.data.cateId) 
    })
  },
  checkInfo() {
    $ajax.post(`${editUser}?token=${wx.getStorageSync('token')}`, this.data.userInfo).then(res => {
      Toast('保存成功')
      this.setData({
        isShow: true,
        isEdit: true
      })
    }).then(res => {
      this.getData()
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
          this.setData({
            'userInfo.payCodeUrl': imgList[0].url
          })
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