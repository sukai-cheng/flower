// pages/movies/movies.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters: [],
    comingSoon: [],
    top250: [],
    target: Object,
    status: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // this.setData({
    //   status: true
    // }),
    wx.request({
        url: 'http://t.yushu.im/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a',
        method: 'GET',
        /**
         * 前提是method的类型必须是GET
         */
        data: {
          start: 1,
          count: 3
        },
        success: (res) => {
          /**
           * 你这个this是在回调函数里面调用的，建议使用箭头函数
           * console.log(this);
           */
          this.setData({
            inTheaters: res.data.subjects,
          })
        }
      }),
      wx.request({
        url: 'http://t.yushu.im/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a',
        data: {
          start: 1,
          count: 3
        },
        success: (res) => {
          /**
           * 你这个this是在回调函数里面调用的，建议使用箭头函数
           * console.log(this);
           */
          // console.log(res);
          this.setData({
            comingSoon: res.data.subjects,
          })
        }
      }),
      wx.request({
        url: 'http://t.yushu.im/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a?start=2&count=3',
        data: {
          start: 6,
          count: 3
        },
        // url: app.gBaseUrl+'top250?start=0&count=3',
        success: (res) => {
          /**
           * 你这个this是在回调函数里面调用的，建议使用箭头函数
           * console.log(this);
           */
          // console.log(res);
          this.setData({
            top250: res.data.subjects,
          })
        }
      })
  },

  /**
   * 点击更多
   */
  onGoToMore(event) {
    // console.log(event);
    const target = event.currentTarget.dataset.type;
    wx.navigateTo({
      url: '/pages/more-movie/more-movie?type=' + target,
    })
  },

  onBindChange(event) {
    var target = event.detail.value;
    var searchUrl = 'http://t.yushu.im/v2/movie/search?q=' + target + '&apikey=0df993c66c0c636e29ecbb5344252a4a';
    wx.request({
      url: searchUrl,
      success: (res) => {

        this.setData({
          status: false,
          target: res.data.subjects[0]
        })
      }
    })

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

  }


})