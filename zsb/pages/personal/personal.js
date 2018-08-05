const request = require('../../utils/request.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    personalInfo: {},
    balance: '0.00',
    unReadMessages: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getPersonalInfo();
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
    this.getPersonalInfo();
    this.getBalance();
    this.getMessage();
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
  // 去钱包页
  toAccount: function() {
    wx.navigateTo({
      url: '/pages/wallet/wallet',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 去用户修改页
   */
  toEditInfo: function() {
    wx.navigateTo({
      url: '/pages/edit-info/edit-info',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 去消息列表
   */
  toMessage: function() {
    wx.navigateTo({
      url: '/pages/message/message',
    })
  },
  /**
   * 去我的订单
   */
  toOrder: function() {
    wx.navigateTo({
      url: '/pages/order/order',
    })
  },
  /**
   * 到我的课程
   */
  toCourse: function() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  getPersonalInfo: function() {
    const token = wx.getStorageSync('token');
    const that = this;
    if (!token) {
      this.toLogin();
      return;
    }
    request.getPersonalInfo(token, function(res) {
      // 判断是否登录
      if (res.data.status === 401) {
        that.toLogin();
        return;
      }
      that.setData({
        personalInfo: res.data
      });
    });
  },
  // 去登录页面
  toLogin: function() {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  },
  // 查询余额
  getBalance: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    if (!token) return;
    request.getBalance(token, function(res) {
      var data = res.data;
      if (data.status === '200' && data.balance) {
        that.setData({
          balance: data.balance
        });
      }
    })
  },
  // 查询消息列表
  getMessage: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    if (!token) return;
    request.getMessageList(token, function(res) {
      if (res.statusCode === 401) return;
      var data = res.data || [];
      var unReadMessages = 0;
      data.forEach(message => {
        if (message.status === 0) {
          unReadMessages++;
        }
      });
      that.setData({
        unReadMessages: unReadMessages
      });
    })
  },
  // 登出
  handleLogout: function() {
    var that = this;
    wx.clearStorage({
      success: function() {
        that.goToLogin();
      }
    })
  },
  // 去登录页
  goToLogin: function () {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }
})