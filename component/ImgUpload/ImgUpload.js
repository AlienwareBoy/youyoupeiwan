import {
  chooseImage,
  uploadFile,
} from './assist.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgNums: {
      type: Number //限制上传的图片张数
    },
    api: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgNums: 3, //限制上传数量
    imgList: [],
    List: [], //上传的图片列表
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 限制7张，选择了5张，还剩下2张,再选择3张，
    addFile(e) {
      let imgList = this.data.imgList;
      let imgNums = this.data.imgNums;
      chooseImage().then(res => {
        return res.tempFilePaths
      }).then(res => {
        let resLength = res.length; //选择图片的张数
        let List = [];
        if (imgList.length + res.length > imgNums) {
          console.log('我进来了')
          wx.showToast({
            title: `最多上传${imgNums}张图片！`,
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: '图片上传中...',
            icon: 'none'
          })
          for (let i = 0; i < res.length; i++) {
            List[i] = uploadFile(api, res[i])
          }
          Promise.all(List).then(res => {
            wx.hideLoading()
            let imgList = [];
            console.log(res)
            for (let i = 0; i < res.length; i++) {
              res[i].data = JSON.parse(res[i].data)
              imgList.push({
                url: res[i].data.data.url
              })
            }
            imgList = [...this.data.imgList, ...imgList]
            console.log(imgList)
            this.setData({
              imgList
            })
            this.triggerEvent('imgList', {
              imgList
            })
          })
        }

      })
    },
  }
})