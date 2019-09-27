import {
  $ajax
} from '../../utils/request'
import {
  queryBannerList,
  noticList
} from '../../utils/api'
Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  onLoad() {
    this.banner();
  },
  banner() {
    $ajax.post(queryBannerList).then(res => {
      console.log()
      this.setData({
        imgUrls: res.data.data
      })
    }).then(res => {
      this.noticList();
    });
  },
  noticList() {
    $ajax.post(noticList).then(res => {
      console.log()
      this.setData({
        itemList: res.data.data
      })
    });
  },
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  closeMask: function() {
    this.setData({
      isSuccess: false
    });
  },
  tobuy: function() {
    this.setData({
      isSuccess: true
    });
  }
});