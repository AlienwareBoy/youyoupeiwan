import {
  Toast
} from './miniappPromise.js';
let $ajax = {
  time:0,
  header: {
    "content-type": "application/json"
  },
  get: function(url, param) {
    return this.methods(url, param, "GET");
  },
  post: function(url, param) {
    return this.methods(url, param, "POST");
  },
  methods: function(url, param = {}, method = "GET") {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        method,
        data: param,
        header: this.header,
        success(res) {
          wx.hideLoading()
          if (res.data.code !== 0) {
            Toast(res.data.msg)
          } else {
            resolve(res);
          }
        },
        fail(err) {
          console.log('',err)
          Toast('服务器连接超时，请稍后再试')
          wx.hideLoading()
          reject(err);
        }
      });
    });
  }
};

export {
  $ajax
}