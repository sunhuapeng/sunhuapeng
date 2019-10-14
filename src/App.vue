<template>
  <div id="app">
    <!-- <navPage></navPage> -->
    <router-view/>
  </div>
</template>

<script>
import navPage from '@/view/navpage/navpage.vue';
export default {
  name: 'App',
  components:{navPage}
}
</script>

<style leng="less">
@import "./common/css/common.less";
html,body{
  height:100%;
  background:#f4f5f5;
}
#app{
  height:100%;
  font-family: "Microsoft YaHei";
}
</style>
