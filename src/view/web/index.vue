<template>
  <div class="other-note">
    <art-list :type="''" :artData="articleList"></art-list>
  </div>
</template>
<script>
import fileList from "@/common/js/getFile.js";
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
  methods: {
    getFiles() {
      fileList.fileList.then(res => {
        this.$store.dispatch("fileList", res);
        let arr = this.$store.getters["fileList"];
        arr.forEach(child => {
          if (child.tag.indexOf("前端") !== -1) {
            this.articleList.push(child);
          }
        });
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
