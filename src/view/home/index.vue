<template>
  <div class="view">
    <div class="right-main">
      <div class="box">
        <all-view></all-view>
      </div>
      <div class="Modular">
        <h2>I Am A Web Developer</h2>
        <p class="content">
          你可能会问我，为什么要做一个这样的网站，这是一个好问题，其实想做自己的网站已经很久了，奈何工作的颠簸，生活的蹉跎，使它尘封、落灰；只是想简单的记录一下学习、生活，有关于技术的理解，也会分享一些经验或者喜欢的事物，你可以来来去去，或者留下你的痕迹，我们可以互相交流，互相分享、种草、追动漫，希望可以给对方一点快乐。
        </p>
      </div>
      <art-main></art-main>
    </div>
  </div>
</template>

<script>
import fileList from "@/common/js/getFile.js";
import artMain from "@/components/artMain";
import allView from "@/view/three-model/allView";
export default {
  name: "Home",
  components: {
    "art-main": artMain,
    "all-view": allView
  },
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.right-main {
  // width: calc(100% - 240px);
  // padding: 0 120px;
  .box {
    height: 460px;
  }
  .content {
    margin-top: 40px;
    color: #909090;
    line-height: 28px;
  }
}
</style>
