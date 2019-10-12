import {
  $ajax
} from '../../utils/request'
import {
  postItem,
  grabPost,
  affirmDeal,
  getLinkWay
} from '../../utils/api'
import {
  Model,
  Toast
} from '../../utils/miniappPromise'
Page({
  data: {
    orderStatus: false,
    wechat: '',
    postLink: false, //如果点击是已经被获取联系方式的用户，下面的按钮变成确认交易
    isGetPhoneIndex: '',
    isSeeJoiner: false, //查看信息
    isSuccess: false
  },
  onLoad(e) {
    this.getData(e.id);
    let isSeeJoiner=false;
    if (Boolean(e.isSeeJoiner)) {
      console.log(1)
      isSeeJoiner = e.isSeeJoiner
    }
    this.setData({
      postId: e.id,
      isSeeJoiner
    })
  },
  getPhone(e) {
    let {
      id,
      wechat,
      state
    } = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset)
    let postLink = false;
    if (!this.data.isSeeJoiner) return
    if (state) {
      //已被获取联系方式
      postLink = true
    }
    this.setData({
      postLink,
      wechat: wechat === null ? '' : wechat,
      isGetPhoneIndex: id
    })
  },
  tobuy() {
    let wechat = this.data.wechat;
    //判断的优先级应该是 订单是否结束==>当前用户是否被获取了联系方式=>
    console.log(this.data.isSeeJoiner)
    if (this.data.orderInfo.mUser && !this.data.isSeeJoiner){
      Toast('不能抢自己的单哦')
      return
    }
    if (this.data.orderInfo.status === 14) {
      return
    } else if (this.data.postLink) {
      Model('温馨提示', '确认与该用户达成交易?').then(res => {
        $ajax.post(`${affirmDeal}?token=${wx.getStorageSync('token')}`, {
          postId: this.data.postId,
          userId: this.data.isGetPhoneIndex
        }).then(res => {
          Toast('交易成功')
          setTimeout(()=>{
            this.getData(this.data.postId)
          })
        })


      })
    } else if (this.data.isSeeJoiner) {
      if (!this.data.isGetPhoneIndex) {
        Toast('请先点击需要获取联系方式的会员')
        return
      }
      $ajax.post(`${getLinkWay}?token=${wx.getStorageSync('token')}`, {
        postId: this.data.postId,
        userId: this.data.isGetPhoneIndex
      }).then(res => {
        console.log(res)
        wx.setClipboardData({
          data: wechat,
          success(res) {
            wx.getClipboardData({
              success(res) {
                Toast('已复制联系方式')
              }
            })
          }
        })
      })
    } else if (this.data.orderInfo.postIs) {
      Toast('已经参与抢单')
      return
    } else {
      Model('温馨提示', '是否确认抢单').then(res => {
        $ajax.post(`${grabPost}?token=${wx.getStorageSync('token')}`, {
          postId: this.data.postId
        }).then(res => {
          
          Toast('抢单成功')
          this.setData({
            isSuccess: true
          })
          this.getData(this.data.postId)
        })
      })
    }
  },
  closeMask() {
    this.setData({
      isSuccess: false
    })
  },
  getData(postId) {
    $ajax.post(`${postItem}?token=${wx.getStorageSync('token')}`, {
      postId
    }).then(res => {
      this.setData({
        orderInfo: res.data.data,
      })
    })
  }
})