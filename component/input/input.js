// component/input/input.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请输入你的查询目标'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    getReault(e) {
      this.triggerEvent('getValue', {
        value: e.detail.value
      })
    },
  }
})