let requestTime = 0;
export const request = (params) => {
    requestTime++;
    wx.showLoading({
        title: 'loadding',
        mask:true
      })
    return new Promise((resolve,reject)=>{
        // 公共路径
        const baseUrl = "https://api.zbztb.cn/api/public/v1";
        wx.request({
            ...params,
            url: baseUrl + params.url,
            success:(res)=> {
                resolve(res)
            },
            fail:(err)=> {
                reject(err)
            },
            complete:()=> {
                requestTime--;
                // if(requestTime === 0) {
                //     wx.hideLoading();
                // }

                // 更多的是用这种方式  用的是逻辑与
                requestTime === 0 && wx.hideLoading();
            }
        })
    })
}
