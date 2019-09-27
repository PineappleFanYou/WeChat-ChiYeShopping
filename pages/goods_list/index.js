// pages/goods_list/index.js
import { request } from '../../request/index.js'
Page({
  data:{
    tabList:[
      {id:0,text:"综合"},
      {id:1,text:"销量"},
      {id:2,text:"价格"}
    ],
    index:0,
    goodsList:[]
  },
  searchList:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPage:1,
  handleItemIndex(e) {
    this.setData({
      index:e.detail.index
    })
  },
  getGoodList() {
    request({
      url:"/goods/search",
      data:this.searchList
    }).then(res=>{
      // console.log(res)
      const { total } = res.data.message;
      this.totalPage = Math.ceil(total/this.searchList.pagesize);
      // 新的数据
      let arr = this.data.goodsList || []
      // arr=[...arr ,...res.data.message.goods]
      this.setData({
        goodsList:[...arr ,...res.data.message.goods]
      })
    })
    // 关闭下拉刷新数组
    wx.stopPullDownRefresh()
  },
  onLoad(cid) {
    this.searchList.cid = cid.cid;
    this.getGoodList()
  },
  onReachBottom() {
    this.searchList.pagenum++
    if(this.searchList.pagenum > this.totalPage) {
      wx.showToast({
        title: '没有数据了',
        icon:"none"
      })
    }else {
      this.getGoodList();
    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    // 页面重回第一页
    this.searchList.pagenum = 1;
    // 重置空数组
    this.setData({
      goodsList:[]
    })
    // 重新发布请求
    this.getGoodList()
  }
})