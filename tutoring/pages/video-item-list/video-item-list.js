// pages/video-item-list/video-item-list.js
const request = require('../../utils/request.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    status: 'pause',
    waiting: ''
  },
  handleCtrAudio: function() {
    if (this.data.status === 'play') {
      this.audioCtx.pause();
      this.setData({
        status: 'pause'
      });
    } else {
      this.setData({
        status: 'play'
      });
      if (this.audioCtx.src) {
        this.audioCtx.play();
      } else {
        if (this.data.list.sectionList.length) {
          this.audioCtx.src = this.data.list.sectionList[0].url;
          var list = this.data.list;
          list.sectionList[0].status = 'active';
          this.setData({
            list: list
          });
        }
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.getItemList(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (this.audioCtx) {
      this.audioCtx.destroy();
    }
    if (wx.createInnerAudioContext) {
      this.audioCtx = wx.createInnerAudioContext();
      this.audioCtx.onWaiting(() => {
        this.setData({
          waiting: '音频加载中，请稍后。。。'
        })
      });
      this.audioCtx.onCanplay(() => {
        this.audioCtx.play();
        this.setData({
          waiting: ''
        })
      });
      this.audioCtx.onPlay(() => {
        this.setData({
          waiting: '',
          status: 'play'
        })
      });
      this.audioCtx.onEnded(() => {
        this.setData({
          status: 'pause'
        });
      });
      this.audioCtx.onStop(() => {
        this.setData({
          status: 'pause'
        });
      });
      this.audioCtx.onPause(() => {
        this.setData({
          status: 'pause'
        });
      });
      this.audioCtx.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }
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
    this.audioCtx.destroy();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.audioCtx.destroy();
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
   * get item list
   */
  getItemList: function (id) {
    var that = this;
    request.getAudioDetail(id, function(res) {
      let data = res.data.data;
      data.sectionList.forEach(function(item) {
        item.status = '';
      })
      that.setData({
        list: data
      });
    })
  },

  /**
   * 处理点击播放时间
   */
  handlePlay: function (event) {
    var audioUrl = event.target.dataset.url;
    var index = event.target.dataset.index;
    let list = this.data.list;
    list.sectionList.forEach(function(item) {
      item.status = '';
    });
    list.sectionList[index].status = 'active';
    this.setData({
      list: list
    })

    if (this.audioCtx) {
      this.setData({
        status: 'play'
      });
      this.audioCtx.src = audioUrl;
    }
  }
})