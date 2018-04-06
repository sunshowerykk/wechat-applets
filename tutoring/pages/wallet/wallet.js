// pages/wallet/wallet.js
const request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance: '0.00',
    card: '',
    password: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBalance();
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
  /**
   * 进入账单明细
   */
  toBill: function () {
    wx.navigateTo({
      url: '/pages/bill/bill',
    })
  },
  // 获取余额
  getBalance: function() {
    const that = this;
    const token = wx.getStorageSync('token');
    if (!token) {
      this.backToLogin();
    }
    request.getBalance(token, function(res) {
      const data = res.data;
      if (data.status === '200') {
        that.setData({
          balance: data.balance
        });
      } else {
        that.backToLogin();
      }
    });
  },
  // 返回登录页
  backToLogin: function() {
    wx.reLaunch({
      url: '/pages/login/login?redirect_url=' + encodeURIComponent('/pages/wallet/wallet')
    })
  },
  // 
  handleCardInput: function(event) {
    const value = event.detail.value;
    this.setData({
      card: value
    });
  },
  handlePasswordInput: function(event) {
    const value = event.detail.value;
    this.setData({
      password: value
    });
  },
  handleSubmit: function() {
    var that = this;
    if (!this.data.card) {
      util.showToast('请输入卡号');
      return;
    }
    if (!this.data.password) {
      util.showToast('请输入密码');
      return;
    }
    var token = wx.getStorageSync('token');
    if (!token) {
      util.showToast('请先登录');
      return;
    }
    var data = {
      'card_id': this.data.card,
      'card_pass': this.data.password,
    }
    request.recharge(token, data, function(res) {
      var data = res.data;
      if (data.status === '200') {
        util.showToast('充值成功', 'success');
        that.getBalance();
      } else {
        util.showToast(data.msg);
      }
    });
  }
})