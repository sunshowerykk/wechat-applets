Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  }
})