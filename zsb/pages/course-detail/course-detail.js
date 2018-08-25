// pages/course-detail/course-detail.js
const request = require('../../utils/request.js');
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: 0,
    tableList: ['课程简介'],
    detail: {},
    isPlay: false,
    videoUrl: '',
    swiperHeight: 300,
    canPlay: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var id = options.id;
    this.getCourseDetail(id);
    this.id = id;
    this.videoContext = wx.createVideoContext('myVideo');
  },
  getSwiperHeight: function() {
    var that = this;
    var query = wx.createSelectorQuery();
    query.select('#swiper').boundingClientRect(function(swiper) {
      wx.createSelectorQuery().selectAll('.bottom').boundingClientRect(function(res) {
        var height = res[that.data.key].top - swiper.top;
        that.setData({
          swiperHeight: height
        });
      }).exec()
    }).exec()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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
    this.getSwiperHeight();
  },
  // 请求课程详情
  getCourseDetail: function(id) {
    var that = this;
    request.getCourseDetail(id, function(res) {
      var detail = res.data;
      // 课程详情富文本转换
      WxParse.wxParse('article', 'html', detail.course.intro, that, 0);
      that.hasAuthPlay(detail.course);
      // setData 然后计算swiper的高度
      that.setData({
        detail: detail
      }, function() {
        that.getSwiperHeight();
        if (detail.course.course_type === 1) {
          that.setData({
            tableList: ['课程简介', '课程目录'],
          })
        }
      })
    })
  },
  // 点击观看
  handleWatch: function(event) {
    var that = this;
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
    request.getCourseAuth(token, data, function(res) {
      if (res.data.url) {
        that.setData({
          isPlay: true,
          videoUrl: res.data.url
        });
        that.videoContext.play();
      }
    });
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
  },
  // 判断时是否有权限观看公开课
  hasAuthPlay(course) {
    var isPlay = ((course.ispay === 3) || (course.discount === '0.00')) && course.course_type === 2;
    this.setData({
      canPlay: isPlay
    });
  }
})