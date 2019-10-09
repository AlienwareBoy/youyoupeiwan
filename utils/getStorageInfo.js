class Storage {
  constructor() {
    this.instance = undefined;
    // this.state = state;
    // console.log(Storage.instance)
  }
  // 保证页面只实例化一个Storage
  init() {
    if (!this.instance) {
      this.instance = new Storage()
    }
  }
  static set(key, data) {
    wx.setStorageSync(key, data);
    console.log('1')
  }
  static get(key) {
    wx.getStorageSync(key);
    console.log('2')
  }
  static remove(key) {
    wx.removeStorage(key)
  }
}

export {
  Storage
}