const https = 'http://118.31.102.106:9117';
// 118.31.102.106:9117   http://47.100.119.84:35152
let token = wx.getStorageSync('token');
let export_defalut = module.exports;
export_defalut.login = https + '/wx/login'; //登录
export_defalut.register = https + '/wx/register'; //注册
export_defalut.auth = https + '/wx/auth'; //授权
export_defalut.imgUpload = https + `/resource/imgUpload`; //上传文件
export_defalut.mine = https + `/user/mine`; //我的
export_defalut.scene = https + `/user/scene`; //获取二维码
export_defalut.getSceneId = https + `/user/wx/scene`; //获取二维码参数
export_defalut.productPost = https + `/post/productPost`; //用户发帖
export_defalut.addCate = https + `/cate/addCate`; //用户新建游戏
export_defalut.queryCateGory = https + `/cate/queryCateGory`; //获取游戏名
export_defalut.parenIdQuery = https + `/cate/parenIdQuery`; //获取游戏段位
export_defalut.postList = https + `/post/postList`; //订单广场
export_defalut.postItem = https + `/post/postItem`; //帖子详情
export_defalut.postCenter = https + `/post/postCentre`; //帖子中心
export_defalut.grabPost = https + `/post/grabPost`; //参与抢单
export_defalut.getUserData = https + `/user/getUserData`; //获取用户信息
export_defalut.editUser = https + `/user/editUser`; //编辑用户信息
export_defalut.orderList = https + `/order/orderList`; //保存用户信息
export_defalut.paylogManage = https + `/comm/paylogManage`; //余额管理
export_defalut.optionPayLog = https + `/comm/optionPayLog`; //用户发起充值
export_defalut.extractPayLog = https + `/comm/extractPayLog`; //用户发起提现
export_defalut.myteam = https + `/user/myteam`; //我的团队
export_defalut.getLinkWay = https + `/post/getLinkWay`; //获取用户的联系方式
export_defalut.affirmDeal = https + `/post/affirmDeal`; //确认交易
export_defalut.optionCategory = https + `/cate/optionCategory`; //删除游戏，或者段位
export_defalut.addlevel = https + `/cate/addlevel`; //新建段位
export_defalut.usermanage = https + `/user/usermanage`; //用户管理
export_defalut.optionPayLogHistory = https + `/comm/optionPayLogHistory`; //充值历史
export_defalut.extractPayLogHistory = https + `/comm/extractPayLogHistory`; //充值历史
export_defalut.agreeApply = https + `/comm/agreeApply`; //操作充值提现按钮
export_defalut.editSecuery = https + `/user/editSecuery`; //修改用户权限
export_defalut.getEndTime = https + `/user/getEndTime`; //提前解封
export_defalut.userTitle = https + `/user/userTitle`; //封号
export_defalut.postCentreByAdmin = https + `/post/postCentreByAdmin`; //订单管理
export_defalut.queryBannerList = https + `/comm/queryBannerList`; //banner
export_defalut.noticList = https + `/comm/noticList`; //公告
export_defalut.infoList = https + `/comm/infoList`; //消息管理
export_defalut.queryUser = https + `/user/queryUser`; //管理员用户详情