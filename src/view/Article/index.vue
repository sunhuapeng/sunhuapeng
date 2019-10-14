<template>
  <div class="article-page">
    <div
      class="article-main"
      v-if="artInfo"
    >
      <p
        class="name"
        v-text="artInfo.name"
      ></p>
      <p class="other">
        <span
          class="author"
          v-if="artInfo.author"
        >
          <span class="iconfont">&#xe65c;</span>
          {{artInfo.author}}
        </span>
        <span
          class="tag"
          v-if="artInfo.tag"
        >
          <span class="iconfont">&#xe607;</span>
          {{artInfo.tag}}
        </span>
        <span
          class="reprint"
          v-if="artInfo.reprint"
        >
          <span class="iconfont">&#xe63e;</span>
          <a
            :href="artInfo.reprint"
            target="view_window"
            v-text="'转载'"
          ></a>
        </span>
        <span
          class="date"
          v-if="artInfo.date"
        >
          <span class="iconfont">&#xe613;</span>
          {{artInfo.date}}
        </span>
      </p>
      <div class="coverImg">
        <img
          class="coverPng"
          v-if="artInfo.coverPng"
          :src="artInfo.coverPng"
          alt=""
        >
      </div>
      <mavon-editor
        v-html="value"
        :subfield="false"
        :defaultOpen="defaultData"
        :toolbarsFlag="false"
        :boxShadow="false"
        @change="changeData"
        v-highlight
      />
    </div>
    <iframe frameborder="0" width="100%" height="500px" v-if="artInfo&&artInfo.case" :src="`../../../static/three_case/html/${artInfo.case}`"></iframe>
  </div>
</template>

<script>
import hljs from "highlight.js";
import Vue from "vue";

import "highlight.js/styles/googlecode.css";
Vue.directive("highlight", function(el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach(block => {
    hljs.highlightBlock(block, "html");
  });
});
export default {
  name: "articleMain",
  data() {
    return {
      //value的值是经过markdown解析后的文本，可使用`@change="changeData"`在控制台打印显示
      value: "",
      defaultData: "preview",
      articles: null,
      artInfo: null,
      html:null
    };
  },
  methods: {
    changeData(value, render) {
      console.log(render);
    },
    getFiles() {},
    changeArtcal() {}
  },
  created() {
    this.articles = this.$store.getters["fileList"];
  },
  mounted() {
    let id = this.$route.query.id;

    this.articles.forEach(d => {
      if (this.$route.query.id == d.id) {
        this.artInfo = d;
        import(`../../../static/md/${d.fileName}`).then(res => {
          this.value = res;
        });
      }
    });
  }
};
</script>

<style lang="less" scope>
.article-main {
  width: 750px;
  padding: 10px 20px;
  background: #ffffff;
  box-sizing: border-box;
  margin-bottom:20px;
}
.name {
  display: inline-block;
  max-width: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
  // margin:20px 0
}
.other {
  // margin-bottom: 20px;
  span {
    color: #999999;
    font-size: 14px;
    line-height: 50px;
  }
  & > span {
    &:hover {
      color: #666666;
    }
  }
  span ~ span {
    margin-left: 20px;
  }
}
.coverImg {
  width: 100%;
  margin-bottom: 20px;
  .coverPng {
    width: 100%;
    display: block;
    vertical-align: middle;
  }
}
</style>

