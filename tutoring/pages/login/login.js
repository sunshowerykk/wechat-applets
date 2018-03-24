// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: '',
    redirectUrl: '',
    password: '',
    username: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var token = wx.getStorageSync('token') || '';
    var redirectUrl = options.redirect_url || '';
    this.setData({
      token: token,
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
  /**
   * 
   */
  usernameInput: function(event) {
    var value = event.detail.value;
    this.setData({
      username: value
    });
  },
  /**
   * 
   */
  passwordInput: function (event) {
    var value = event.detail.value;
    this.setData({
      password: value
    });
  },
  /**
   * 登录接口
   */
  onLogin: function() {
    var that = this;
    var url = 'http://api.kaoben.top/users/login';
    wx.request({
      url: url,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        phone: that.data.username,
        password: that.data.password
      },
      success: function(res) {
        if (res.data.access_token) {
          that.setToken(res.data.access_token);
          var redirectUrl = that.data.redirectUrl || '/pages/personal/personal';
          wx.reLaunch({
            url: redirectUrl,
            fail: function(err) {
              console.log(err);
            }
          })
        } else {
          wx.showToast({
            title: res.data[0].message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: function() {

      }
    })
  },
  /**
   * 设置登录token
   */
  setToken: function(token) {
    wx.setStorage({
      key: 'token',
      data: token,
    })
  }
})