// pages/category/index.js
Page({
  data: {
    // 左边导航菜单栏
    categoriesList:[]
  },
  getCategoriesData(){
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/categories',
      success:(res) =>{
        console.log(res)
        this.setData({
          categoriesList:res.data.message
        })
      }
    })
  },
  indexTap(e) {
    // console.log(e)
    this.setData({
      value:e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    this.getCategoriesData();
  }
})