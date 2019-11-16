<template>
  <div class="art-main Modular">
    <h2>ARTICLES</h2>
    <art-list :artData="articleList" :type="'modal'"></art-list>
  </div>
</template>
<script>
import artList from "@/components/artList";
import GetFiles from "@/common/js/getFile.js";
export default {
  name: "art-main",
  components: {
    "art-list": artList
  },
  data() {
    return {
      articleList: []
    };
  },
  created() {
    this.getFiles();
  },
  watch: {
    articleList(newV, oldV) {
      this.$store.dispatch("fileList", newV);
    }
  },
  methods: {
    getFiles() {
      let fileFun = new GetFiles();
      fileFun.init();
      fileFun.getFile.then(res => {
        this.articleList = res;
      });
    }
  }
};
</script>