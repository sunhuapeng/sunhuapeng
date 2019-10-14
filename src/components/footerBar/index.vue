<template>
  <div class="footer">
    <nav-bar :type="'foot'"></nav-bar>
  </div>
</template>
<script>
import navBar from "@/components/navBar";
export default {
  name: "footerBar",
  components: {
    "nav-bar": navBar
  }
};
</script>
<style lang="less" scope>
.footer {
  width: 100%;
  height: 40px;
  background: #414141;
  padding: 0 40px;
  box-sizing: border-box;
}
</style>