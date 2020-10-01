// pages/posts/posts.js
// var postData = require("../../data/posts-data.js")
import {
  postList
} from '../../data/posts-data.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   * 生命周期函数 == 钩子函数 (由框架自动调用)
   */
  async onLoad(options) {
    /**设置缓存 */
    wx.setStorageSync('flag', true)

    /**读取缓存 */
    // const flag = wx.getStorageSync('flag');
    const flag = await wx.getStorage({
      key: 'flag',
    })
    
    

    // 数据绑定
    this.setData({
      postList
    });
  },

  onGotoDetail(event) {
    // console.log(event);/*能够拿到id值*/
    const pid = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/post-detail/post-datil?pid='+pid,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // console.log(this.data);
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