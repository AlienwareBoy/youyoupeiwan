import {
  $ajax
} from '../../utils/request'
import {
  infoList
} from '../../utils/api'
Page({
  data: {
    form: {
      page: 1,
      pageSize: 20,
    },
  },
  onLoad() {
  },
  onShow() {
    this.getData(this.data.form);
  },
  getData(form) {
    console.log(form)
    $ajax.post(`${infoList}?token=${wx.getStorageSync('token')}`, form).then(res => {
      let itemList = res.data.data;
      itemList.forEach(item => {
        if (/(30|32|12|14|24)/.test(item.type)) {
          item.showPrice = true
        }
        if (/(40|22)/.test(item.type)) {
          item.showPhone = true
        }
      })
      console.log()
      console.log(itemList.map(item => item.remark))
      this.setData({
        itemList
      })
    })
  }
})