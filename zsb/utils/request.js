const util = require('./util.js');

const HOST = 'https://api.kaoben.top';

// ==== 账号相关 ====
// 登录
const onLogin = (data, redirectUrl) => {
  let url = `${HOST}/users/login`;
  wx.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: data,
    success: (res) => {
      if (res.data.access_token) {
        var token = res.data.access_token;
        wx.setStorage({
          key: 'token',
          data: token,
        });
        redirectUrl = redirectUrl || '/pages/personal/personal';
        wx.reLaunch({
          url: redirectUrl,
          fail: function (err) {
            console.log(err);
          }
        })
      } else {
        var errorMsg = res.data[0].message;
        util.showToast(errorMsg);
      }
    }
  })
};

// 是否登录
const isLogin = function(token, cb) {
  var url = HOST + '/users/islogin?access-token=' + token;
  wx.request({
    url: url,
    success: cb
  })
};

// 注册
const onRegister = (data, redirectUrl) => {
  var url = HOST + '/users/signup';
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.statusCode !== 200) {
        util.showToast(res.data[0].message);
      } else {
        // todo login
        onLogin({phone: data.phone, password: data.password}, redirectUrl);
      }
    }
  })
}

// 获取验证码
const getCaptcha = data => {
  var url = `${HOST}/users/logincode`
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      util.showToast(res.data.message);
    }
  })
}

// 重置密码
const onResetPassword = (data, redirectUrl) => {
  var url = HOST + '/users/changepassword';
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function(res) {
      if (res.statusCode !== 200) {
        util.showToast(res.data[0].message);
      } else {
        // todo login
        onLogin({ phone: data.phone, password: data.password }, redirectUrl);
      }
    }
  })
}

// ====== 音频相关 =====
// 音频首页
const getAudioHome = cb => {
  const url = HOST + '/audios/audio-home';
  wx.request({
    url: url,
    success: cb
  })
};

// 音频列表页
const getAudioList = (id, cb) => {
  const url = HOST + '/audios/get-audio?cat_id=' + id;
  wx.request({
    url: url,
    success: cb
  })
};

// 音频详情
const getAudioDetail = (id, cb) => {
  const url = HOST + '/audios/get-audiosection?audio_id=' + id;
  wx.request({
    url: url,
    success: cb
  })
}

// ==== 个人中心相关 ====
// get 个人信息
const getPersonalInfo = (token, cb) => {
  const url = HOST + '/personal/user-profile?access-token=' + token;
  wx.request({
    url: url,
    success: cb
  })
};

// 上传文件
const uploadFile = (token, filePath, cb) => {
  const url = HOST + '/personal/update-headimg?access-token=' + token;
  console.log(url);
  wx.uploadFile({
    url: url,
    method: 'POST',
    filePath: filePath,
    name: 'headimg',
    success: cb
  })
}

// 修改昵称
const updateNickname = function(token, nickname, cb) {
  const url = HOST + '/personal/update-username?access-token=' + token;
  wx.request({
    url: url,
    method: 'POST',
    data: { 'username': nickname },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: cb
  })
}

// 修改性别
const updateGender = function(token, gender, cb) {
  const url = HOST + '/personal/update-gender?access-token=' + token;
  wx.request({
    url: url,
    method: 'POST',
    data: { 'gender': gender },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: cb
  })
}

// ==== 钱包相关 ====
// 获取钱包余额
const getBalance = function(token, cb) {
  const url = HOST + '/cards/wechat-get-balance?access-token=' + token;
  wx.request({
    url: url,
    mehod: 'GET',
    success: cb
  })
}

// 学习卡充值
const recharge = function(token, data, cb) {
  const url = HOST + '/cards/wechat-recharge?access-token=' + token;
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: cb
  })
}

// 收支明细
const getBill = function(token, cb) {
  const url = HOST + '/cards/coin-details?access-token=' + token;
  wx.request({
    url: url,
    success: cb
  })
};

// ==== 订单相关 ====
// 获取个人订单信息
const getOrder = function(token, cb) {
  const url = HOST + '/personal/order-list?access-token=' + token;
  wx.request({
    url: url,
    success: cb
  })
};
// 确认订单
const confirmOrder = function(token, id, cb) {
  var url = HOST + '/order/confirm-order?access-token=' + token;
  wx.request({
    url: url,
    method: 'POST',
    data: { course_id: id },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: cb
  })
}

// ==== 消息相关 ====
// 获取消息列表
const getMessageList = function(token, cb) {
  const url = HOST + '/personal/message-list?access-token=' + token;
  wx.request({
    url: url,
    success: cb
  })
}
// 消息详情
const getMessageDetail = function(token, data, cb) {
  const url = HOST + '/personal/message-view?access-token=' + token;
  wx.request({
    url: url,
    method: 'POST',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: cb
  })
}

// 我的课程列表
const getMyCourse = function(token, cb) {
  var url = HOST + '/personal/course-list?access-token=' + token;
  wx.request({
    url: url,
    success: cb
  })
}

// ==== 首页相关 ====
// 首页总接口
const getHome = function(cb) {
  const url = HOST;
  wx.request({
    url: url,
    complete: cb
  })
}

// ==== 课程相关 ====
// 课程详情
const getCourseDetail = function(id, cb) {
  const token = wx.getStorageSync('token') || '';
  const url = HOST + '/courses/detail?courseid=' + id + '&access-token=' + token;
  wx.request({
    url: url,
    success: cb
  })
}
// 课程信息
const getCourseInfo = function(id, cb) {
  const token = wx.getStorageSync('token');
  const url = HOST + '/order/courseinfo?access-token=' + token;
  wx.request({
    url: url,
    method: 'POST',
    data: { course_id: id },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: cb
  })
}
// 章节权限验证接口
const getCourseAuth = function(token, data, cb) {
  const url = HOST + '/courses/check?access-token=' + token;
  wx.request({
    url: url,
    data: data,
    method: 'POST',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: cb
  })
}

// ==== 学院相关 ====
// 学院课程列表
const getSchoolCourse = function(id, cb) {
  const url = HOST + '/courses/college?cat=' + id;
  wx.request({
    url: url,
    success: cb
  })
}

// ==== 支付相关 ====
// code 2 openid
const code2openid = function(code, cb) {
  const url = HOST + '/user/onlogin?code=' + code;
  wx.request({
    url: url,
    success: cb
  })
}

// 支付
const pay = function(data, cb) {
  const url = HOST + '/order/pay?access-token=' + data.token 
    + '&order_sn=' + data.sn 
    + '&code=' + data.code 
    + '&coupon_id=' + data.coupon_id 
    + '&use_coin=' + data.use_coin;
  wx.request({
    url: url,
    success: cb
  })
}

// 检查订单支付状态
const checkOrderStatus = function(cb) {
  const url = HOST + '/orderinfo/wxcheckorder';
  wx.request({
    url: url,
    complete: cb
  })
}

// 获取订单详情
const getOrderInfo = function(token, sn, cb) {
  var url = HOST + '/order/orderinfo?access-token=' + token + '&order_sn=' + sn;
  wx.request({
    url: url,
    success: cb
  })
}

module.exports = {
  onLogin: onLogin,
  onRegister: onRegister,
  getCaptcha: getCaptcha,
  onResetPassword: onResetPassword,
  getAudioHome: getAudioHome,
  getAudioList: getAudioList,
  getAudioDetail: getAudioDetail,
  uploadFile: uploadFile,
  getPersonalInfo: getPersonalInfo,
  updateNickname: updateNickname,
  updateGender: updateGender,
  getBalance: getBalance,
  recharge: recharge,
  getBill: getBill,
  getOrder: getOrder,
  getMessageList: getMessageList,
  getMessageDetail: getMessageDetail,
  getHome: getHome,
  getCourseDetail: getCourseDetail,
  getMyCourse: getMyCourse,
  getSchoolCourse: getSchoolCourse,
  code2openid: code2openid,
  getCourseInfo: getCourseInfo,
  isLogin: isLogin,
  confirmOrder: confirmOrder,
  getCourseAuth: getCourseAuth,
  getOrderInfo: getOrderInfo,
  pay: pay,
  checkOrderStatus: checkOrderStatus
}