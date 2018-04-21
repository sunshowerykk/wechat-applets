// pages/course-detail/course-detail.js
const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: 0,
    tableList: ['课程简介', '课程目录'],
    detail: {},
    isPlay: false,
    videoUrl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getCourseDetail(id);
    this.id = id;
    this.videoContext = wx.createVideoContext('myVideo');
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
  // 获取课程详情
  getCourseDetail: function(id) {
    
  },
  handleTableClick: function(event) {
    var id = event.target.dataset.id;
    this.setData({
      key: id
    });
  },
  // 滑动事件
  onScroll: function(event) {
    var current = event.detail.current;
    this.setData({
      key: current
    });
  },
  // 请求课程详情
  getCourseDetail: function(id) {
    var that = this;
    request.getCourseDetail(id, function(res) {
      var detail = res.data;
      that.setData({
        detail: detail
      });
    })
  },
  // 点击观看
  handleWatch: function(event) {
    var courseId = this.id;
    var capterId = event.target.dataset.id;
    var url = event.target.dataset.url;
    var token = wx.getStorageSync('token');
    var data = {
      'course_id': courseId,
      'section_id': capterId
    }
    if (!token) {
      this.redirectLogin();
      return;
    }

    this.setData({
      isPlay: true,
      videoUrl: url
    });
    this.videoContext.play();
  },
  // 点击购买事件
  handlePay: function() {
    var that = this;
    var id = this.id;
    var token = wx.getStorageSync('token');
    
    // 判断token
    if (!token) {
      this.redirectLogin();
      return;
    }
    // 请求接口判断
    request.isLogin(token, function(res) {
      var data = res.data;
      if (data.status === 1) {
        wx.redirectTo({
          url: '/pages/order-confirm/order-confirm?id=' + that.id,
        })
      } else {
        that.redirectLogin();
      }
    })
  },
  // 跳转登录页
  redirectLogin: function() {
    var id = this.id;
    var pageUrl = '/pages/course-detail/course-detail?id=' + id;
    var url = '/pages/login/login?redirect_url=' + encodeURIComponent(pageUrl);
    wx.redirectTo({
      url: url,
    })
  }
})