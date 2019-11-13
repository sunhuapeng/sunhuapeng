<template>
  <div class="other-note">
    <art-list
      v-if="articleList.length"
      :type="''"
      :artData="articleList"
    ></art-list>
    <p v-else class="nothing">
      啥子都没得...
    </p>
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
      articleList: [],
      tagArr: ["html", "css", "javascript", "vue"]
    };
  },
  methods: {
    getFiles() {
      fileList.fileList.then(res => {
        this.$store.dispatch("fileList", res);
        let arr = this.$store.getters["fileList"];
        arr.forEach(child => {
          if (child.tag.indexOf("学习") !== -1) {
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
