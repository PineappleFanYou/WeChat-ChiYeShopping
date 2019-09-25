// pages/category/index.js
import { request } from '../../request/index.js'
Page({
  data: {
    // 左边导航菜单栏
    categoriesList:[],
    // 右边的详细信息数组
    detailInfoList:[],
    currentIndex:0,
  },
  // 定义一个全局变量，后面可以使用
  Cates:[],
  catesIndex:0,
  // 封装左边导航菜单栏的请求
  getCategoriesData(){
    request({
      url:"/categories"
    }).then(res=>{
      this.Cates=res.data.message;
      wx.setStorageSync('categories', {data:res.data.message,Timer:Date.now()});
      this.setData({
        categoriesList:res.data.message,
        detailInfoList:res.data.message[0].children
      })
    })
  },

  // 点击左边菜单栏，添加active样式
  bindCurrentIdex(e) {
    this.catesIndex = e.target.dataset.index
   this.setData({
    currentIndex:e.target.dataset.index,
    detailInfoList:this.Cates[e.target.dataset.index].children
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    let cates = wx.getStorageSync('categories')
    if(cates) {
      if(Date.now() - cates.Timer > 1000 * 6) { 
        this.getCategoriesData();
      }else {
        this.Cates=cates.data; 
        this.setData({
          categoriesList:cates.data,
          detailInfoList:cates.data[0].children
        })
      }
    }else {
      this.getCategoriesData();
    }
  }
})