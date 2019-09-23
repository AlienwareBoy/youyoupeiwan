var export_default = module.exports;

function Toast(title, icon = 'none', duration = 1000) {
  return new Promise(function(resolve, reject) {
    wx.showToast({
      title: title,
      icon: icon,
      duration: duration,
      success: function(result) {
        resolve(result);
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}
// 返回图片本地路径
function File(src, id = '') {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: src,
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

function Model(title = '', content = '中心内容') {
  return new Promise(function(resolve, reject) {
    wx.showModal({
      title,
      content,
      success(res) {
        if (res.confirm) {
          resolve(res)
        } else if (res.cancel) {
          reject(res)
        }
      }
    })

  });
}

function chooseImage() {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: (res) => {
        resolve(res)
      },
    })
  })
}

function uploadFile(api, res) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: api,
      filePath: res,
      name: 'file',
      formData: {
        user: 'test'
      },
      success(res) {
        resolve(res)
      }
    })
  })
}

function wxLogin(api, res) {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        resolve(res)
      },
      reject: err => {
        reject(err)
      }
    })
  })
}
export {
  uploadFile,
  chooseImage,
  Model,
  Toast,
  File,
  wxLogin
}