// pages/info-input/info-input.js
const request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let value = options.value;
    let id= options.id;
    this.setData({
      value: value,
      id: id
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
  handleInput: function(event) {
    var inputVal = event.detail.value;
    
  },
  handleConfirm: function(event) {
    var value = event.detail.value;
    var key = 'token';
    var token = wx.getStorageSync(key)
    request.updateNickname(token, value, function(res) {
      if (res.data.status === '200') {
        util.showToast('修改成功');
      } else {
        util.showToast('网络问题，请稍后重试。。。');
      }
      wx.navigateBack({});
    })
  }
})