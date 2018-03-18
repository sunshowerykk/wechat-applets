// pages/video-index/video-index.js
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
    wx.navigateTo({
      url: '/pages/video-group-list/video-group-list?id=' + id,
    })
  },
  /**
   * to item list
   */
  toItemList:function (event) {
    var id = event.target.dataset.id;
    wx.navigateTo({
      url: '/pages/video-item-list/video-item-list?id=' + id,
    })
  },
  /**
   * 获取音频文件
   */
  getVedioList: function () {
    var url = 'http://www.kaoben.top/audio/audio-home';
    var that = this;
    wx.request({
      url: url,
      success: function (res) {
        var list = res.data.data || [];
        var result = [];
        list.forEach(function (item) {
          if (item.audioList.length > 0) {
            result.push(item);
          }
        })
        that.setData({
          list: result
        });
      }
    })
  },
  /**
   * 播放音乐
   */
  playMusic: function () {
    const backgroundAudioManager = wx.getBackgroundAudioManager()

    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '许巍'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
  },
})