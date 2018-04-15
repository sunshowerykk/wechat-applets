// pages/course/course.js
const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCourse();
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
   * to detail
   */
  toDetail: function(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/course-detail/course-detail?id=' + id,
    })
  },
  // 获取我的课程列表
  getMyCourse: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    if (!token) {
      that.goToLogin();
      return;
    }

    request.getMyCourse(token, function(res) {
      if (res.statusCode === 401) {
        that.getToLogin();
        return;
      }
      that.setData({
        courseList: res.data
      });
    })
  },
  // 返回去登录
  goToLogin: function() {
    wx.reLaunch({
      url: '/pages/login/login',
    })
  }
})