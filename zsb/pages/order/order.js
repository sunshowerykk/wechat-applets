// pages/order/order.js
const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder();
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
  // 获取订单列表
  getOrder: function() {
    const that = this;
    const token = wx.getStorageSync('token');
    if (!token) {
      this.goToLogin();
      return;
    }
    request.getOrder(token, function(res) {
      var data = res.data || [];
      that.setData({
        orderList: data
      });
    })
  },
  // 去登陆
  goToLogin: function() {
    wx.reLaunch({
      url: '/pages/login/login?redirect_url=' + encodeURIComponent('/pages/order/order'),
    })
  },
  // 去支付
  handlePay: function(event) {
    var sn = event.target.dataset.sn;
    wx.redirectTo({
      url: '/pages/pay/pay?sn=' + sn,
    })
  }
})