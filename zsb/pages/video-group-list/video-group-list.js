// pages/video-group-list/video-group-list.js
const request = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getGroupList(options.id);
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
   * get group list
   */
  getGroupList: function (id) {
    var url = 'http://www.kaoben.top/audio/get-audio?cat_id=' + id;
    var that = this;
    request.getAudioList(id, function(res) {
      let list = res.data.data || [];
      if (list.audioList.length % 3 === 2) {
        list.audioList.push({})
      }
      that.setData({
        list: list
      });
    });
  },
  toItemList: function (event) {
    var id = event.target.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/video-item-list/video-item-list?id=' + id,
    })
  }
})