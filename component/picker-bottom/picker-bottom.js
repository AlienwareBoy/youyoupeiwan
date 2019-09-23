// component/picker-bottom/picker-bottom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '660rpx'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShowPopup: false,
    closePopup: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closePopup(e) {
      setTimeout(() => {
        this.setData({
          closePopup: false
        })
      }, 500)
      this.setData({
        isShowPopup: false,
      })
    },
    openPopup() {
      setTimeout(() => {
        this.setData({
          isShowPopup: true
        })
      }, 500)
      this.setData({
        closePopup: true,
      })
    },
    stopClose() {
      this.setData({
        isShowPopup: true
      })
    },
  }
})