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
      if (res.statusCode !== 200) {
        util.showToast(res.data[0].message);
      }
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


module.exports = {
  onLogin: onLogin,
  onRegister: onRegister,
  getCaptcha: getCaptcha,
  onResetPassword: onResetPassword
}