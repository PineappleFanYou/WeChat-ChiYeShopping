
import { request } from '../../request/index.js'
Page({
    data:{
        // 轮播图数组
        imageList:[],
        //分类数组
        catitemsList:[],
        // 楼层的数组
        floorTitle:[]
    },
    onLoad() {
      this.getSwiperData();
      this.getCatitemsData();
      this.getFloorData();
    },
    // 获取轮播图请求
    getSwiperData() {
      request({
        url:"/home/swiperdata"
      }).then(res=>{
        // console.log(res)
        this.setData({
          imageList:res.data.message
        })
      })

        },
  // 获取导航分类请求
  getCatitemsData() {
    request({
      url:"/home/catitems"
    }).then(res=>{
      this.setData({
        catitemsList:res.data.message
      })
    })
  },
  // 获取楼层请求
  getFloorData() {
    request({
      url:"/home/floordata"
    }).then(res=>{
      this.setData({
        floorTitle:res.data.message
      })
    })
  }
})
