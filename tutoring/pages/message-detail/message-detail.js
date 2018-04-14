// pages/message-detail/message-detail.js
var request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messsageDetail: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var id = options.id;
    this.getMessageDetail(id);
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
  getMessageDetail: function(id) {
    var that = this;
    var token = wx.getStorageSync('token');
    var data = {
      'read_id': id
    };
    request.getMessageDetail(token, data, function(res) {
      var data = res.data;
      if (data.status == '401') {
        that.backToLogin();
        return;
      }
      that.setData({
        messsageDetail: data
      });
    });
  },
  // 返回登录页
  backToLogin: function () {
    wx.reLaunch({
      url: '/pages/login/login?redirect_url=' + encodeURIComponent('/pages/message-detail/message-detail')
    })
  },
})