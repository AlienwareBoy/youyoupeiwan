// component/saveUserCode/saveUserCode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    showCode:false,
    itemList: [
      '../../assets/images/step1@2x.png',
      '../../assets/images/step2@2x.png',
      '../../assets/images/step3@2x.png',
      '../../assets/images/step4.png'
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeMask(){
      this.setData({
        showCode:false
      })
    },
    show() {
      this.setData({
        showCode: true
      })
    },
    close() {
      this.setData({
        showCode: false
      })
    }
  }
})