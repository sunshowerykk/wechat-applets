const util = require('./util.js');

const HOST = 'http://api.kaoben.top';

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

        var redirectUrl = redirectUrl || '/pages/personal/personal';
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
const getOrder = function(token, cb) {
  const url = HOST + '/personal/order-list?access-token=' + token;
  wx.request({
    url: url,
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

// ==== 首页相关 ====
// 首页总接口
const getHome = function(cb) {
  const url = HOST;
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
  getHome: getHome
}