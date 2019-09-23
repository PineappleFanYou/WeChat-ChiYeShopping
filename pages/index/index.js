
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
            wx.request({
                url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata', 
                success:(res)=> {          
                    // console.log(res)    
                this.setData({
                    imageList : res.data.message
                })
                }
              })
        },
  // 获取导航分类请求
  getCatitemsData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/catitems',
      success:(res) =>{
        // console.table(res)
        this.setData({
          catitemsList:res.data.message
        })
      }
    })
  },
  // 获取楼层请求
  getFloorData() {
    wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/floordata',
      success:(res) =>{
        // console.log(res)
        this.setData({
          floorTitle: res.data.message
        })
      }
    })
  }
})
