const https = 'http://47.100.119.84:35152';
const token = wx.getStorageSync('token');
let export_defalut = module.exports;
export_defalut.login = https + '/wx/login'; //登录
export_defalut.register = https + '/wx/register'; //注册
export_defalut.auth = https + '/wx/auth'; //授权
export_defalut.imgUpload = https + `/resource/imgUpload`; //上传文件
export_defalut.mine = https + `/user/mine?token=${token}`; //我的
export_defalut.scene = https + `/user/scene?token=${token}`; //获取二维码
export_defalut.getSceneId = https + `/user/wx/scene`; //获取二维码参数
export_defalut.productPost = https + `/post/productPost?token=${token}`; //用户发帖
export_defalut.addCate = https + `/cate/addCate?token=${token}`; //用户新建游戏
export_defalut.queryCateGory = https + `/cate/queryCateGory`; //获取游戏名
export_defalut.parenIdQuery = https + `/cate/parenIdQuery`; //获取游戏段位
export_defalut.postList = https + `/post/postList`; //订单广场
export_defalut.postItem = https + `/post/postItem?token=${token}`; //帖子详情
export_defalut.postCenter = https + `/post/postCentre?token=${token}`; //帖子中心
export_defalut.grabPost = https + `/post/grabPost?token=${token}`; //参与抢单
export_defalut.getUserData = https + `/user/getUserData?token=${token}`; //获取用户信息
export_defalut.editUser = https + `/user/editUser?token=${token}`; //编辑用户信息
export_defalut.orderList = https + `/order/orderList?token=${token}`; //保存用户信息
export_defalut.paylogManage = https + `/comm/paylogManage?token=${token}`; //余额管理
export_defalut.optionPayLog = https + `/comm/optionPayLog?token=${token}`; //用户发起充值
export_defalut.extractPayLog = https + `/comm/extractPayLog?token=${token}`; //用户发起提现
export_defalut.myteam = https + `/user/myteam?token=${token}`; //我的团队
export_defalut.getLinkWay = https + `/post/getLinkWay?token=${token}`; //获取用户的联系方式
export_defalut.affirmDeal = https + `/post/affirmDeal?token=${token}`; //确认交易
export_defalut.optionCategory = https + `/cate/optionCategory?token=${token}`; //删除游戏，或者段位
export_defalut.addlevel = https + `/cate/addlevel?token=${token}`; //新建段位
export_defalut.usermanage = https + `/user/usermanage?token=${token}`; //用户管理
export_defalut.usermanage = https + `/user/usermanage?token=${token}`; //用户管理
export_defalut.optionPayLogHistory = https + `/comm/optionPayLogHistory?token=${token}`; //充值历史
export_defalut.extractPayLogHistory = https + `/comm/extractPayLogHistory?token=${token}`; //充值历史
export_defalut.agreeApply = https + `/comm/agreeApply?token=${token}`; //操作充值提现按钮
export_defalut.editSecuery = https + `/user/editSecuery?token=${token}`; //修改用户权限
export_defalut.getEndTime = https + `/user/getEndTime?token=${token}`; //提前解封
export_defalut.userTitle = https + `/user/userTitle?token=${token}`; //封号
export_defalut.postCentreByAdmin = https + `/post/postCentreByAdmin?token=${token}`; //订单管理