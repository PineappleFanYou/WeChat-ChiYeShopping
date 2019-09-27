// pages/goods_detail/index.js
import { request } from '../../request/index.js'
Page({
  data:{
    // 轮播图
    goodsPcis:{},
    goodsNameAndPrice:{}
  },
  goods_id:{
    goods_id:""
  },
  // 发送请求
  goodsDetail() {
    request({
      url:"/goods/detail",
      data:this.goods_id
    }).then(res=>{
      console.log(res)
      const { pics } = res.data.message
      this.setData({
        goodsPcis:pics,
        goodsNameAndPrice:res.data.message
      })
      // console.log(this.goodsInfo);
    }) 
  },
  // 加载页面就刷新
  onLoad(goods_id) {
    // console.log(goods_id);
    this.goods_id.goods_id = goods_id.goods_id;
    this.goodsDetail();
    wx.getStorageSync("cart") || {}
  
  },
  // 点击之后有预览放大的效果
  handleImagePreview(e) {
    // console.log(e)
    const { goodsPcis } = this.data;
    const url = goodsPcis.map(v=>v.pics_mid_url);
    const current = e.currentTarget.dataset.current;
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls: url // 需要预览的图片http链接列表
    })
  },

  // 点击加入购物车
  handleAddCart() {
    const { goodsNameAndPrice } = this.data;
    //获取本地存储的数据，要么是一个空字符串，要么是[{}]
    let cartList = wx.getStorageSync('cart') || []
    // 判断当前的商品是否已经存在,根据唯一的数据（id）来判断
    const index = cartList.findIndex(v=>v.goods_id === goodsNameAndPrice.goods_id)
    console.log(cartList)
    if(index === -1) {
      cartList.push({
        goods_id:goodsNameAndPrice.goods_id,
        goods_name:goodsNameAndPrice.goods_name,
        goods_price:goodsNameAndPrice.goods_price,
        goods_small_logo:goodsNameAndPrice.goods_small_logo,
        num:1
      })
    }else {
      cartList[index].num++;
    }
    wx.setStorageSync('cart',cartList);
  }

})