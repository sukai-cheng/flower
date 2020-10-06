

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    res:Object
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
      onGotoDetail(event) {
        const pid = event.currentTarget.dataset.id;
        wx.navigateTo({
          url: '/pages/post-detail/post-datil?pid='+pid,
        })
    }
  }
})
