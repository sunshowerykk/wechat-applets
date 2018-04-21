// pages/order-confirm/order-confirm.js
const request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this.getOrderInfo();
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
  BackToIndex: function() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  confirm: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    var id = this.id;
    request.confirmOrder(token, id, function(res) {
      if (res.data.code !== 0) {
        util.showToast('订单有误，请稍后重试...');
        return;
      } else {
        wx.navigateTo({
          url: '/pages/pay/pay?id=' + that.id,
        })
      }
    })
  },
  /**
   * 请求订单详情
   */
  getOrderInfo: function() {
    var that = this;
    request.getCourseInfo(this.id, function(res) {
      if (res.data.code !== 0) {
        util.showToast('订单有误，请稍后重试...');
        return;
      };
      that.setData({
        course: res.data.course
      });
    })
  }
})