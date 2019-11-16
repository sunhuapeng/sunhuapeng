<template>
  <div class="other-note Modular">
    <h2>WEB NOTE</h2>
    <art-list class="art-list" :type="''" :artData="articleList"></art-list>
  </div>
</template>
<script>
import GetFiles from "@/common/js/getFile.js";
import artlist from "@/components/artList";
export default {
  name: "note",
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
      fileFun.init("前端");
      fileFun.getFile.then(res => {
        this.articleList = res;
      });
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.getFiles();
  }
};
</script>
<style lang="less" scoped>
.art-list {
  margin-top: 40px;
}
</style>