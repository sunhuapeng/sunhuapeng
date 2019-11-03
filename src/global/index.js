export default {
  install(Vue) {
    var that = this
    // 1. 添加全局方法或属性
    // ue.global = this
    // 2. 添加全局资源
    // 3. 注入组件
    Vue.mixin({
      created() {
        this.global = that
      }
    })
    // 格式化时间戳
    Vue.prototype.$dateFormet = function (val) {
      let v = new Date(Number(val))
      var year=v.getFullYear(); 
      var month=v.getMonth()+1; 
      var date=v.getDate(); 
      var hour=v.getHours(); 
      var minute=v.getMinutes(); 
      var second=v.getSeconds(); 
      return year+"-"+(month<10?'0'+month:month)+"-"+(date<10?'0'+date:date); 
    }
  }
}