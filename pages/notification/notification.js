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
    notificationList: [{
      id: 0,
      state: 0,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '120',
      reallyPrice: '2200'
    }, {
      id: 5,
      state: 5,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '',
      reallyPrice: '2200'
    }, {
      id: 6,
      state: 6,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '',
      reallyPrice: '2200'
    }, {
      id: 4,
      state: 4,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '',
      reallyPrice: '2200'
    }, {
      id: 3,
      state: 3,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '120',
      reallyPrice: '2200'
    }, {
      id: 1,
      state: 1,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '120',
      reallyPrice: '2200'
    }, {
      id: 2,
      state: 2,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '',
      reallyPrice: '2200'
    }, {
      id: 7,
      state: 7,
      text: '我是消息',
      sponsorName: '笑笑先生',
      receiverName: '王麻子',
      city: '广州',
      gender: '男',
      age: '23',
      game: '王者荣耀',
      time: '2019-08-28 12:00',
      mockMoney: '120',
      reallyPrice: ''
    }]
  },
  onLoad() {

  },
  onShow() {
    this.getData(this.data.form);
  },
  getData(form) {
    $ajax.post(infoList, form).then(res => {
      this.setData({
        itemList: res.data.data
      })
    })
  }
})