<template>
  <div class="view">
    <div class="home">
      <!-- <nav-bar :type="'nav'">
      </nav-bar> -->
      <router-view class="router-view">
      </router-view>
    <!-- <footer-bar></footer-bar> -->
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navBar";
import footerBar from "@/components/footerBar";
export default {
  name: "Home",
  components: {
    "nav-bar": navBar,
    "footer-bar": footerBar
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.view{
  // height:100%;
}
.home {
  // height: calc(100% - 40px);
}
.router-view {
  // padding: 20px 0;
  // min-height:calc(100% - 40px);
  box-sizing: border-box;
}
</style>

