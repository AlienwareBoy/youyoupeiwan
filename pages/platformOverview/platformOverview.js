import {
  $ajax
} from '../../utils/request'
import {
  queryBannerList,
  noticList
} from '../../utils/api'
Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
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
    }).then(res=>{
      this.noticList();
    });
  },
  noticList(){
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