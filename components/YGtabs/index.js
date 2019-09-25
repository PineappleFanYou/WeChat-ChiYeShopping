// components/YGtabs/index.js
Component({
  properties: {
    tabList:{
      type:Array,
      value:[]
    },
    currentIndex:{
      type:Number,
      value:0
    }
  },
  methods: {
    handleTaps(e) {
      const { index } = e.target.dataset
      this.triggerEvent('itemIndex',{index})
    }
  }
})
