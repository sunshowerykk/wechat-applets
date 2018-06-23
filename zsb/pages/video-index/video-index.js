// pages/video-index/video-index.js
const requst = require('../../utils/request.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVedioList();
    // this.playMusic();
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
   * toGroupList
   */
  toGroupList: function(event) {
    var id = event.target.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/video-group-list/video-group-list?id=' + id,
    })
  },
  /**
   * to item list
   */
  toItemList: function (event) {
    var id = event.target.dataset.id;
    if (!id) return;
    wx.navigateTo({
      url: '/pages/video-item-list/video-item-list?id=' + id,
    })
  },
  /**
   * 获取音频文件
   */
  getVedioList: function () {
    var that = this;
    requst.getAudioHome(function(res) {
      var list = res.data.data || [];
      var result = [];
      list.forEach(function (item) {
        if (item.audioList.length > 0) {
          result.push(item);
        }
        // 两个补一个
        if (item.audioList.length % 3 === 2) {
          item.audioList.push({});
        }
      })
      that.setData({
        list: result
      });
    })
  }
})