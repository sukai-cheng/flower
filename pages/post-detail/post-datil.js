import {
  postList
} from '../../data/posts-data.js'
const app = getApp()
Page({
  data: {
    collect: false,
    _mgr: null,
    _pid: 0,
    _collectList: {},
    _musicFlag: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data._pid = options.pid;
    const postData = postList[options.pid];
    let collect = this.data.collect;
    let collectList = wx.getStorageSync('collected');
    if (collectList == '') {
      collect = this.data.collect;
    } else {
      collect = collectList[this.data._pid];
    }
    this.setData({
      postData,
      collect,
      _musicFlag: this.currentMusicIsPlaying()
    })
    const mgr = wx.getBackgroundAudioManager();
    this.data._mgr = mgr;

    mgr.onPlay(this.onMusicStart);
    mgr.onPause(this.onMusicStop);
  },

  /**
   * 当前文章的音乐是不是在播放
   */
  currentMusicIsPlaying() {
    if (app.gPlayingMusic && app.gIsPlayingPostId == this.data._pid) {
      return true;
    }
    return false;
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
   * 点击收藏状态
   */
  onCollect(event) {
    let collectList = {};
    if (wx.getStorageSync('collected') != "") {
      collectList = wx.getStorageSync('collected');
    }
    collectList[this.data._pid] = !this.data.collect;
    let collect = collectList[this.data._pid];
    //数据持久化
    wx.setStorageSync('collected', collectList);
    this.setData({
      collect
    });

    // 提示框
    wx.showToast({
      title: collect == true ? '收藏成功' : '取消收藏',
      duration: 500
    })

    /**
     * 通过添加await和async可以将promise解析为一个object对象
     */
    // const result = await wx.showModal({
    //   title: "是否收藏文章",
    // })

    // if (result.confirm) {
    //   let collectList = wx.getStorageSync('collected');
    //   collectList[this.data._pid] = !this.data.collect;
    //   let collect = collectList[this.data._pid];
    //   //数据持久化
    //   wx.setStorageSync('collected', collectList);
    //   this.setData({
    //     collect
    //   });
    // }
  },

  /**
   * 分享按钮
   */
  async onShare(event) {
    const result = await wx.showActionSheet({
      itemList: ['分享到QQ', '分享到Wechat', '分享到朋友圈'],
    })
    console.log(result)
  },

  /**
   * 音乐播放
   */
  onMusicStart(event) {
    const mgr = this.data._mgr;
    mgr.src = postList[this.data._pid].music.url;
    mgr.title = postList[this.data._pid].music.title;
    mgr.coverImgUrl = postList[this.data._pid].music.coverImg;
    app.gPlayingMusic = true;
    app.gIsPlayingPostId = this.data._pid;

    this.setData({
      _musicFlag: true

    })
  },

  /**
   * 音乐暂停
   */
  onMusicStop() {
    const mgr = this.data._mgr;
    mgr.pause();
    app.gPlayingMusic = false;
    app.gIsPlayingPostId = -1;
    this.setData({
      _musicFlag: false
    })
  }
})