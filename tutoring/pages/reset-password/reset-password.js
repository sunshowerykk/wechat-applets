// pages/register/register.js
const request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
    captcha: '',
    captchaBtnText: '获取验证码',
    disabled: '',
    redirectUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var redirectUrl = options.redierct_url;
    this.setData({
      redirectUrl: redirectUrl
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  handleRegister: function () {
    var phone = this.data.phone;
    var password = this.data.password;
    var captcha = this.data.captcha;

    if (!phone) {
      util.showToast('请输入手机号码');
      return;
    }

    if (!password) {
      util.showToast('请输入密码');
      return;
    }

    if (!captcha) {
      util.showToast('请输入验证码');
      return;
    }
   
    var data = {
      phone: phone,
      password: password,
      change_password_code: captcha
    }
    var redirectUrl = this.data.redirectUrl;
    request.onResetPassword(data, redirectUrl);
  },
  /**
   * 手机号输入绑定事件
   */
  handleUsernameInput: function (event) {
    var value = event.detail.value;
    this.setData({
      phone: value
    });
  },
  /**
   * 密码输入绑定事件
   */
  handlePasswordInput: function (event) {
    var value = event.detail.value;
    this.setData({
      password: value
    });
  },
  /**
   * 验证码输入事件
   */
  handleCaptchaInput: function (event) {
    var value = event.detail.value;
    this.setData({
      captcha: value
    });
  },
  /**
   * 点击获取验证码
   */
  handleGetCaptcha: function () {
    var that = this;
    var time = 60;
    var captchaBtnText = '';
    var phone = this.data.phone;
    // 检查手机号
    if (!phone) {
      util.showToast('请输入手机号');
      return;
    }
    // 时间间隔
    if (this.data.captchaBtnText !== '获取验证码') {
      return;
    }
    // 请求控制
    captchaBtnText = '(' + time + ')s后重发';
    that.setData({
      captchaBtnText: captchaBtnText,
      disabled: 'disabled'
    });
    var loop = setInterval(function () {
      time--;
      if (time <= 0) {
        captchaBtnText = '获取验证码';
        time = 60;
        clearInterval(loop);
        that.setData({
          disabled: ''
        });
      } else {
        captchaBtnText = '(' + time + ')s后重发';
      }

      that.setData({
        captchaBtnText: captchaBtnText
      });
    }, 1000);
    // 请求数据
    request.getCaptcha({ phone: phone });
  },
})