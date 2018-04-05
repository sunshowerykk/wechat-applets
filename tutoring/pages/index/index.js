//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    schoolList: [
      {
        name: '公共学院',
        logo_url: 'http://kaoben.top/uploads/img/course-category/15192022687586.png',
        id: '1',
      }
    ]
  },
  scroll: function() {

  },
  navigatoSchool: function() {
    wx.navigateTo({
      url: '/pages/school-detail/school-detail',
    })
  }
})
