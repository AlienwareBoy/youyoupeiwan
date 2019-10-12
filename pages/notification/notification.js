import { $ajax } from "../../utils/request";
import { infoList } from "../../utils/api";
import { Toast } from "../../utils/miniappPromise.js";
Page({
  data: {
    isShowNextPage: true,
    form: {
      page: 1,
      pageSize: 20
    }
  },
  onLoad() {},
  onShow() {
    this.getData(this.data.form);
  },
  getWechat(e){
    let {wechat}=e.currentTarget.dataset;
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
  },
  getData(form) {
    $ajax
      .post(`${infoList}?token=${wx.getStorageSync("token")}`, form)
      .then(res => {
        let itemList = res.data.data;
        itemList.forEach(item => {
          if (/(30|32|12|14|24)/.test(item.type)) {
            item.showPrice = true;
          }
          if (/(40|22)/.test(item.type)) {
            item.showPhone = true;
          }
        });
        this.setData({
          isShowNextPage: res.data.page.next,
          itemList
        });
      });
  },
  operating(e) {
    let { index } = e.currentTarget.dataset;
    if (/(12|30)/.test(this.data.itemList[index].type)) {
      wx.navigateTo({
        url: `../../superAdmin/pages/userHistory/userHistory?userId=${this.data.itemList[index].reUserId}`
      });
    }
  },
  onReachBottom(e) {
    if (!this.data.isShowNextPage) {
      Toast("已经到最后一页");
      return;
    }
    this.data.form.page++;
    this.getData(this.data.form);
    this.setData({
      "form.page": this.data.page
    });
  }
});
