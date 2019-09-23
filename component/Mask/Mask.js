// component/Mask/Mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showMask: {
      type: Boolean,
      value: true
    }
  },
  observers: {
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    showMask: false,
    closePopup: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    closeMask() {
      this.triggerEvent('closeMask', this.data.showMask)
    }
  }
})