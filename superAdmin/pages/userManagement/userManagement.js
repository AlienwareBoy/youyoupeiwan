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
    endTime:'请选择封号时间',
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
    this.getData();
  },
  getData() {
    let api = usermanage;
    $ajax.post(api, this.data.form).then(res => {
      this.setData({
        itemList: res.data.data
      })
    })
  },
  checkUserSeal() {
    let str = `${this.data.year}-${this.data.month}-${this.data.day}`
    let date = new Date(str);
    if (this.data.endTime ==='请选择封号时间')return
    $ajax.post(userTitle, {
      "userId": this.data.nowUserId,
      "reason": this.data.reason,
      "endTime": Date.parse(str)
    }).then(res => {
      this.userType = this.selectComponent('#userType');
      this.userType.closePopup();
      Toast('封号成功')
      this.setData({
        isClickIndex:''
      })
    })
  },
  getTime() {
    this.popBottom = this.selectComponent('#TimeChoice');
    this.popBottom.openPopup();
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
          url: `../../../pages/userInfo/userInfo?isShowJoin=0`
        })
        break
      case '1':
        let itemList = this.data.itemList;
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
          isClickIndex:0
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
  checkType(e) {
    if (this.data.isClickIndex === 1) {
      let user = this.data.itemList.filter(item => item.userId === this.data.nowUserId);
      console.log(user)
      if (!user[0].isfor) {
        Toast('当前用户没有被封号')
        return
      }
      Model(`温馨提醒`, `是否解封当前用户?`).then(res => {
        $ajax.post(getEndTime, {
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
  checkGrade() {
    let status = Number(this.judge(this.data.isClickIndex));
    if (!this.data.isClickIndex) {
      Toast('请选择用户等级')
      return
    } else {
      Model(`温馨提醒`, `是否将当前用户等级修改为${this.data.gradeList[this.data.isClickIndex]}?`).then(res => {
        $ajax.post(editSecuery, {
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
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
})