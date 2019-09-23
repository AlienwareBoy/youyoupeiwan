let https = 'xxxxxxxxxx' //测试
// 上传图片
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

export {
  chooseImage,
  uploadFile,
  https
}