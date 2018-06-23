// pages/edit-info/edit-info.js
const request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    personalInfo: {},
    array: ['男', '女'],
    index: 0,
    objectArray: [
      {
        name: '男',
        id: 0
      },
      {
        name: '女',
        id: 1
      }
    ]
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
    this.getPersonalInfo();
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
  uploadImg: function() {
    const that = this;
    wx.chooseImage({
      count: 1,
      success: function(res) {
        that.uploadFile(res.tempFilePaths[0]);
      }
    });
  },
  uploadFile: function(filePath) {
    const that = this;
    const token = wx.getStorageSync('token');
    console.log(token, filePath);
    request.uploadFile(token, filePath, function(res) {
      var data = res.data;
      console.log(res);
      try {
        data = JSON.parse(data)
      } catch(e) {
        console.log(e);
      }
      let personalInfo = that.data.personalInfo;
      personalInfo.picture = data.url || '';
      that.setData({
        personalInfo: personalInfo
      })
    })
  },
  getPersonalInfo: function() {
    const that = this;
    const token = wx.getStorageSync('token');
    request.getPersonalInfo(token, function(res) {
      let info = res.data;
      info.sex = that.setSex(info.gender);
      console.log();
      that.setData({
        personalInfo: info || {}
      });
    })
  },
  // 判断男女
  setSex: function(gender)  {
    switch(gender) {
      case 0: return '男';
      case 1: return '女';
      default: return '';
    }
  },
  // 修改昵称
  handleEditNickname: function() {
    var url = '/pages/info-input/info-input?id=nickname&value=' + this.data.personalInfo.username;
    wx.navigateTo({
      url: url,
    })
  },
  handleEditSex: function() {
    var url = '/pages/info-input/info-input?id=sex&value=' + this.data.personalInfo.gender;
    wx.navigateTo({
      url: url,
    })
  },
  bindPickerChange: function(event) {
    console.log(event.detail.value);
    const value = event.detail.value;
    var info = this.data.personalInfo;
    info.gender = value;
    this.setData({
      personalInfo: info
    });
    const token = wx.getStorageSync('token');
    request.updateGender(token, value, function(res) {
      if (res.data.status === '200') {
        util.showToast('修改成功');
      } else {
        util.showToast('网络问题，请稍后重试。。。');
      }
    })
  }
})