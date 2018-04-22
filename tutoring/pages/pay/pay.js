// pages/pay/pay.js
const request = require('../../utils/request.js');
const util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    balance: '0.00',
    isWallet: false,
    isError: false,
    order: {},
    showQuan: false,
    isUseYHQ: true,
    coupon: {},
    needPay: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.sn = options.sn;
    this.getBalance();
    this.getOrderInfo();
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
   * code to openid
   */
  login: function(cb) {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          cb(res.code)
        }
      }
    })
  },
  /**
   * code to openid
   */
  codeToOpenid: function(code) {
    request.code2openid(code, function (res) {
      console.log(res.data);
    })
  },
  // 获取钱包余额
  getBalance: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    request.getBalance(token, function(res) {
      that.setData({
        balance: res.data.balance
      });
    })
  },
  // 
  radioChange: function (event) {
    
  },
  handleWalletClick: function(event) {
    var isCheck = !this.data.isWallet;
    this.setData({
      isWallet: isCheck
    });
  },
  getOrderInfo: function() {
    var that = this;
    var token = wx.getStorageSync('token');
    var sn = this.sn;
    request.getOrderInfo(token, sn, function(res) {
      if (res.data.code !== 0) {
        that.setData({
          isError: true
        });
        return;
      }
      that.setData({
        order: res.data,
        needPay: res.data.order_info.order_amount
      });
    })
  },
  // 展示优惠券
  showQuan: function() {
    this.setData({
      showQuan: true
    });
  },
  // 不使用优惠券
  noQuanClick: function() {
    this.setData({
      showQuan: false,
      isUseYHQ: false,
      coupon: {}
    });
  },
  // 选择了哪个优惠券
  selectYHQ: function(event) {
    var that = this;
    var id = event.currentTarget.dataset.id;
    this.coinId = id;
    var coupon = that.data.order.coupon[id];
    var needPay = that.data.needPay - coupon.fee;
    if (needPay < 0) {
      needPay = '0.00'
    } else {
      needPay = needPay.toFixed(2);
    }
    this.setData({
      showQuan: false,
      isUseYHQ: true,
      coupon: coupon,
      needPay: needPay
    });

  },
  // handle pay
  handlePay: function() {
    var that = this;
    var token = wx.getStorageSync('token');
  
    this.login(function(code) {
      var data = {
        token: token,
        code: code,
        sn: that.sn,
        coupon_id: -1,
        use_coin: 0
      }
      if (that.data.isWallet) data.use_coin = 1;
      if (that.data.coupon.coupon_id) data.coupon_id = that.data.coupon.coupon_id;
      request.pay(data, function(res) {
        var data = res.data;
        if (data.code < 0) {
          util.showToast('支付失败，请稍后再试...');
          return;
        }

        if (data.wxpay === 0) {
          util.showToast('支付成功');
          that.navigateToOrderPage();
          return;
        }

        if (data.wxpay === 1) {
          var payOptions = data.wxpaydata;
          payOptions.success = function(res) {
            console.log(res);
            if (res.errMsg === 'requestPayment:ok') {
              that.checkOrderStatus();
              util.showToast('支付成功');
              that.navigateToOrderPage();
            } else {
              util.showToast('支付失败');
            }
          };
          payOptions.complete = function(final) {
            console.log(final);
          }
          wx.requestPayment(payOptions);
        }
      })
    })
  },
  // 跳转至订单页
  navigateToOrderPage: function() {
    wx.reLaunch({
      url: '/pages/order/order',
    })
  },
  // 检查订单状态
  checkOrderStatus: function() {
    request.checkOrderStatus(function(res) {

    })
  }
})