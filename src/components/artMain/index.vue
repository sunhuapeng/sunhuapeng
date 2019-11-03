<template>
  <div class="art-main Modular">
    <h2>ARTICLES</h2>
    <art-list :artData="articleList" :type="'modal'"></art-list>
  </div>
</template>
<script>
import artList from "@/components/artList";
import fileList from "@/common/js/getFile.js";
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
  methods: {
    getFiles() {
      fileList.fileList.then(res => {
        this.$store.dispatch("fileList", res);
        this.articleList = this.$store.getters["fileList"];
      });
    }
  }
};
</script>