<template>
  <div class="other-note Modular">
    <h2>EXCERPT</h2>
    <art-list v-if="articleList.length" :type="''" :artData="articleList"></art-list>
    <p v-else class="nothing">啥子都没得...</p>
  </div>
</template>
<script>
import GetFiles from "@/common/js/getFile.js";
import artlist from "@/components/artList";
export default {
  name: "design",
  components: {
    "art-list": artlist
  },
  data() {
    return {
      articleList: []
    };
  },
  watch: {
    articleList(newV, oldV) {
      this.$store.dispatch("fileList", newV);
    }
  },
  methods: {
    getFiles() {
      let fileFun = new GetFiles();
      fileFun.init("美文");
      fileFun.getFile.then(res => {
        this.articleList = res;
      });
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.getFiles();
    console.log();
  }
};
</script>

<style lang="less" scoped>
.other-note {
  width: 100%;
}
.nothing {
  font-size: 32px;
  color: #bebebe;
  text-align: center;
  line-height: 520px;
}
</style>
