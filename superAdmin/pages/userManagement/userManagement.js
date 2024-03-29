import {
  Model,
  Toast
} from '../../../utils/miniappPromise.js'
import {
  usermanage,
  editSecuery,
  getEndTime,
  userTitle
} from '../../../utils/api.js'
import {
  $ajax
} from '../../../utils/request.js'

const date = new Date()
const years = []
const months = []
const days = []
console.log()
for (let i = date.getFullYear(); i <= 2025; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    borderColor: '',
    ishiddenPopup: '', //原生组件防止穿透
    endTime: '请选择封号时间',
    reason: '',
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [9999, 1, 1],
    nowUserId: '',
    isClickIndex: '',
    userGrade: '',
    nowMoney: '',
    popupState: 1,
    popupTitle: '余额调整',
    PermissionList: [{
        name: '0',
        value: '发帖',
        checked: false,
      },
      {
        name: '1',
        value: '抢单',
        checked: false,
      },
      {
        name: '2',
        value: '封号',
        checked: false,
      },
      {
        name: '3',
        value: '提前解封',
        checked: false,
      }
    ],
    gradeList: ['用户', 'vip', '超管'],
    operating: ['封号', '解封'],
    form: {
      "userName": "",
      "page": 1,
      "pageSize": 10
    },
    nowList: [],
    index: 0,
    array: ['用户详情', '提现/充值历史', '用户等级设置', '用户封号处理']
  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      'endTime': `${this.data.years[val[0]]}年${this.data.months[val[1]]}月${this.data.days[val[2]]}日`,
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  },
  getReason(e) {
    this.setData({
      reason: e.detail.value
    })
  },
  clickIndex(e) {
    let {
      index
    } = e.currentTarget.dataset;
    this.setData({
      isClickIndex: index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setStorageSync('token', wx.getStorageSync('userObj').token)

  },
  onShow: function() {
    this.getData();
  },
  getData() {
    let api = usermanage;
    $ajax.post(`${api}?token=${wx.getStorageSync('token')}`, this.data.form).then(res => {
      let itemList = res.data.data;
      itemList.forEach(item => {
        switch (item.userType) {
          case 10:
            item.borderColor = 'p1'
            break;
          case 20:
            item.borderColor = 'p2'
            break;
          case 30:
            item.borderColor = 'p3'
            break;
        }
      })
      this.setData({
        itemList: res.data.data,
        borderColor: ''
      })
    })
  },
  checkType(e) {
    if (this.data.isClickIndex === 1) {
      let user = this.data.itemList.filter(item => item.userId === this.data.nowUserId);
      console.log(user)
      if (!user[0].isfor) {
        Toast('当前用户没有被封号')
        return
      }
      Model(`温馨提醒`, `是否解封当前用户?`).then(res => {
        $ajax.post(`${getEndTime}?token=${wx.getStorageSync('token')}`, {
          userId: this.data.nowUserId,
        }).then(res => {
          this.popBottom = this.selectComponent('#userGrade')
          this.popBottom.closePopup()
          this.getData();
          Toast('修改成功')
          this.setData({
            isClickIndex: ''
          })
        })
      })
    }
  },
  checkUserSeal() {
    if (this.data.isClickIndex === 0) {
      //封号
      let str = `${this.data.year}-${this.data.month}-${this.data.day}`
      let date = new Date(str);
      if (this.data.endTime === '请选择封号时间') return
      $ajax.post(`${userTitle}?token=${wx.getStorageSync('token')}`, {
        "userId": this.data.nowUserId,
        "reason": this.data.reason,
        "endTime": Date.parse(str)
      }).then(res => {
        this.userType = this.selectComponent('#userType');
        this.userType.closePopup();
        this.getData();
        Toast('封号成功')
        this.setData({
          isClickIndex: ''
        })
      })
    } else {
      //解封
      this.checkType()
    }

  },
  getTime() {
    this.popBottom = this.selectComponent('#TimeChoice');
    this.popBottom.openPopup();
    this.data.ishiddenPopup = this.popBottom.data.isShowPopup;
    this.setData({
      ishiddenPopup: !this.data.ishiddenPopup
    })
  },
  getValue(e) {
    this.setData({
      'form.userName': e.detail.value
    })
    this.getData();
  },

  checkboxChange: function(e) {
    let list = this.data.nowList.push(...e.detail.value);
    let list2 = this.data.PermissionList;
    this.setData({
      PermissionList: list2,
      nowList: this.data.nowList
    })
  },
  choiceClick(e) {
    let {
      index
    } = e.currentTarget.dataset;
    this.data.PermissionList[index].checked = !this.data.PermissionList[index].checked;
    this.checkAll(this.data.PermissionList, this.data.PermissionList[index].value, index);
  },
  checkAll(list, value, index) {
    for (let i = 0; i < list.length; i++) {
      if (list[index].value == '封号' && list[index].checked || list[index].value == '提前解封' && list[index].checked) {
        list[i].checked = false;
        list[index].checked = true;
      }
    }

    this.setData({
      PermissionList: list
    })
  },
  bindPickerChange(e) {
    let {
      index
    } = e.currentTarget.dataset;
    switch (e.detail.value) {
      case '0':
        wx.navigateTo({
          url: `../../../pages/userInfo/userInfo?isfrom=false&isAdmin=30&id=${this.data.itemList[index].userId}`
        })
        break
      case '1':
        let itemList = this.data.itemList;
        console.log(itemList)
        let url = `../../../superAdmin/pages/userHistory/userHistory?userImage=${itemList[index].headImg}&price=${itemList[index].useMoney}&userName=${itemList[index].userName}&userId=${itemList[index].userId}`;
        wx.navigateTo({
          url
        })
        break
      case '2':
        this.popBottom = this.selectComponent('#userGrade');
        this.popBottom.openPopup();
        break
      case '3':
        this.userType = this.selectComponent('#userType');
        this.userType.openPopup();
        this.setData({
          isClickIndex: 0
        })
        break;
    }
    this.setData({
      nowUserId: this.data.itemList[index].userId
    })
  },
  judge(grade) {
    let result = '';
    switch (grade) {
      case 0:
        result = '10'
        break;
      case 1:
        result = '20'
        break;
      case 2:
        result = '30'
        break;
    }
    return result
  },

  checkGrade() {
    let status = Number(this.judge(this.data.isClickIndex));
    if (!this.data.isClickIndex) {
      Toast('请选择用户等级')
      return
    } else {
      Model(`温馨提醒`, `是否将当前用户等级修改为${this.data.gradeList[this.data.isClickIndex]}?`).then(res => {
        $ajax.post(`${editSecuery}?token=${wx.getStorageSync('token')}`, {
          userId: this.data.nowUserId,
          status
        }).then(res => {
          this.popBottom = this.selectComponent('#userGrade')
          this.popBottom.closePopup()
          this.getData();
          Toast('修改成功')
          this.setData({
            isClickIndex: ''
          })
        })
      })
    }
  },
  checkMoney(e) {
    this.setData({
      nowMoney: e.detail.value
    })
  }
})