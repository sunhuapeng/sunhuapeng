<template>
  <div class="article-page">
    <div class="top-title" v-if="artInfo">
      <div class="adrom"></div>
      <div class="title-main mw">
        <div class="goback" @click="goback()">
          <i class="el-icon-d-arrow-left"></i>
        </div>
        <div class="content">
          <p class="name" v-text="artInfo.name"></p>
          <p>
            <span class="author" v-if="artInfo.author">
              <span class="iconfont">&#xe65c;</span>
              {{ artInfo.author }}
            </span>
            <span class="tag" v-if="artInfo.tag">
              <span class="iconfont">&#xe607;</span>
              <span v-for="data in artInfo.tag" :key="data" v-text="' '  + data"></span>
            </span>
            <span class="reprint" v-if="artInfo.reprint">
              <span class="iconfont">&#xe63e;</span>
              <a :href="artInfo.reprint" target="view_window" v-text="'转载·侵删'"></a>
            </span>
            <span class="date" v-if="artInfo.date">
              <span class="iconfont">&#xe613;</span>
              {{ $dateFormet(artInfo.date) }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="article-main" v-if="artInfo">
      <!-- <div class="coverImg">
        <img class="coverPng" v-if="artInfo.coverPng" :src="artInfo.coverPng" alt />
      </div>-->
      <mavon-editor
        v-if="value"
        v-html="value"
        :subfield="false"
        :defaultOpen="defaultData"
        :toolbarsFlag="false"
        :boxShadow="false"
        @change="changeData"
        v-highlight
      />
      <!-- <iframe
        frameborder="0"
        width="100%"
        height="500px"
        v-if="artInfo && artInfo.case"
        :src="`./static/three_case/html/${artInfo.case}`"
      ></iframe>-->
    </div>
    <div class="gitalk">
      <div id="gitalk-container">
        <div class="gt-container">
        <div class="gt-meta"></div>
        <div class="gt-header"></div>
        <div class="gt-comments"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import Vue from "vue";

import "highlight.js/styles/googlecode.css";
import "gitalk/dist/gitalk.css";
import Gitalk from "gitalk";
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
      html: null
    };
  },
  methods: {
    changeData(value, render) {
      console.log(render);
    },
    goback() {
      this.$router.go(-1);
    },
    initTalk() {
      var gitalk = new Gitalk({
        // gitalk的主要参数
        clientID: "0b1f628009d15179d27f",
        clientSecret: "69b877da8d038a42dccca8ac2dd6b214b2956abe",
        repo: "sunhuapeng.github.io",
        owner: "sunhuapeng",
        admin: ["sunhuapeng"],
        id: this.$route.query.id,
        distractionFreeMode: false
      });
      gitalk.render("gitalk-container");
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
          this.$nextTick(() => {
            this.value = res;
            this.initTalk();
          });
        });
      } else {
      }
    });
    document.body.scrollTop = 0 + "px";
  }
};
</script>

<style lang="less" scope>
.article-main {
  background: #ffffff;
  box-sizing: border-box;
  margin-bottom: 20px;
  max-width: 677px;
  margin-left: auto;
  margin-right: auto;
}
.top-title {
  height: 420px;
  background-image: linear-gradient(
    -25deg,
    rgb(253, 156, 127) 30%,
    rgb(255, 108, 133) 100%
  );
  background-image: -moz-linear-gradient(
    -25deg,
    rgb(253, 156, 127) 30%,
    rgb(255, 108, 133) 100%
  );
  background-image: -webkit-linear-gradient(
    -25deg,
    rgb(253, 156, 127) 30%,
    rgb(255, 108, 133) 100%
  );
  background-image: -ms-linear-gradient(
    -25deg,
    rgb(253, 156, 127) 30%,
    rgb(255, 108, 133) 100%
  );
}
div.adrom {
  height: 5px;
  width: 100%;
  position: absolute;
  top: 0;
  background: rgba(255, 255, 255, 0.5);
}
.mw {
  max-width: 1200px;
  margin: auto;
  position: relative;
  margin: auto;
  height: 100%;
  position: relative;

  & > div.content {
    position: absolute;
    bottom: 100px;
  }
  .name {
    font-size: 32px;
    color: #ffffff;
    & + p {
      color: #ffffff;
      opacity: 0.8;
      line-height: 32px;
      margin-top: 20px;
      &>span ~ span {
        margin-left: 40px;
      }
    }
  }
}
.article-main {
  max-width: 1000px;
  margin: 0 auto;
  margin-top: 100px;
}
.gitalk {
  max-width: 1000px;
  margin: 10px auto;
}
.goback {
  position: fixed;
  right: 20px;
  bottom: 120px;
  cursor: pointer;
  font-size:24px;
  color:#e9e9e9;
  z-index:9999;
  &:hover{
    font-size:32px
  }
}
</style>
