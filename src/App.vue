<template>
  <div id="app">
    <keep-alive exclude="articleMain">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style leng="less">
#app{
  font-family: "Microsoft YaHei";
}
</style>
