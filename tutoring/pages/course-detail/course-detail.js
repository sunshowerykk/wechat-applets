// pages/course-detail/course-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    key: 0,
    tableList: ['课程简介', '课程目录']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;

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
  }
})