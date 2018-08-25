//index.js
//获取应用实例
const app = getApp()
const request = require('../../utils/request.js');
Page({
  data: {
    home: {},
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 6000,
    duration: 2000,
    schoolList: [],
    bgColor: '',
    college_course: []
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    this.getHome();
  },
  // 去学院详情
  navigatoSchool: function (event) {
    var id = event.target.dataset.id;
    wx.navigateTo({
      url: '/pages/school-detail/school-detail?id=' + id,
    })
  },
  navigatoSchools: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/school-detail/school-detail?id=' + id,
    })
  },
  // 去课程页
  navigateToCourse: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/course-detail/course-detail?id=' + id
    })
  },
  // 请求首页
  getHome: function () {
    var that = this;
    request.getHome(function (res) {
      var data = res.data;

      // 数据处理
      var imgUrls = data.home_ads.map(function (item) {
        return item.img;
      });
      that.setData({
        home: { class_courses: data.class_courses }
      }, function() {
        that.setData({
          imgUrls: imgUrls          
        }, function() {
          that.setData({
            home: {
              class_courses: data.class_courses,
              open_courses: data.open_courses
            }
          });
        })
      });

      that.setData({
        home: data,
      });
    })
  },
  // 动态生成学院背景颜色
  getSchoolColor: function (index) {
    switch (index) {
      case 0: return 'bc_green';
      case 1: return 'bc_yellow';
      case 2: return 'bg_purper';
      case 3: return 'bc_blue';
      case 4: return 'bc_red';
      case 5: return 'bg_music';
      case 6: return 'bg_wenxue';
      default: return 'bc_blue'
    }
  }
})
