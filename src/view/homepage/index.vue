<template>
  <div class="homepage">
    <div class="map">
      <three-china-map></three-china-map>
    </div>
    <div class="screen">
      <p
        class="date-sort"
        @click="setDateSort()"
        :class="dateSort?'':'cc'"
      >日期排序 <span class="iconfont">&#xe66a;</span> </p>
      <p
        class="original"
        :class="sort.original?'cc':''"
        @click="setOriginal()"
      >原创</p>
      <el-input
        placeholder="输入关键词"
        suffix-icon="el-icon-search"
        v-model="sort.search"
        class="search-input"
        size="mini"
        @change="changeSearch()"
      >
      </el-input>
      <div
        @click="refresh()"
        class="refresh"
      >刷新</div>

    </div>
    <div class="home-main">
      <div class="article-list">
        <art-list :artData="articleList"></art-list>
      </div>
      <div class="side-bar">
        <!-- <history-art></history-art> -->
      </div>
    </div>
  </div>
</template>
<script>
import map from "@/components/three/china-map";
import artList from "@/components/artList";
import fileList from "@/common/js/getFile.js";
import historyArt from "@/components/historyArt";
export default {
  name: "homepage",
  components: {
    "three-china-map": map,
    "art-list": artList,
    "history-art": historyArt
  },
  data() {
    return {
      articleList: [],
      searchVal: "",
      dateSort: true,
      sort: {
        original: false,
        search: ""
      }
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
    },
    refresh() {
      this.sort = {
        original: false,
        search: ""
      };
      this.getFiles();
    },
    // 按照时间顺序筛选
    setDateSort() {
      this.dateSort = !this.dateSort;
      this.articleList.sort((a, b) => {
        if (this.dateSort) {
          return Number(b.date) - Number(a.date);
        } else {
          return Number(a.date) - Number(b.date);
        }
      });
    },
    // 选择是否原创
    setOriginal() {
      this.sort.original = !this.sort.original;
      let newArr = [];
      this.sort.search = "";
      this.articleList = this.$store.getters["fileList"];
      this.articleList.forEach(e => {
        if (this.sort.original) {
          if (!e.reprint) {
            newArr.push(e);
          }
          this.articleList = newArr;
        }
      });
    },
    // 关键字筛选
    changeSearch() {
      let newArr = [];
      this.articleList = this.$store.getters["fileList"];
      this.sort.original = false;
      this.articleList.forEach(e => {
        if (this.sort.search) {
          if (e.name.indexOf(this.sort.search) !== -1) {
            newArr.push(e);
          }
          this.articleList = newArr;
        }
      });
    }
  }
};
</script>
<style lang="less" scope>
.home-main {
  display: flex;
  justify-content: space-between;
  & > div {
    margin: 20px 0;
  }
  .article-list {
    flex: 3;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .side-bar {
    flex: 1;
    width: 380px;
  }
}
.screen {
  display: flex;
  // justify-content: space-between;
  margin-top: 20px;
  & > p ~ p {
    margin-left: 20px;
  }
  .date-sort {
    color: #999999;
    line-height: 40px;
    cursor: pointer;
    &:hover {
      color: #50c3ff;
    }
  }
  .search-input {
    width: 180px;
    height: 32px;
    line-height: 40px;
    margin-left: 20px;
  }
  .original {
    line-height: 40px;
    color: #999999;
    cursor: pointer;
    &:hover {
      color: #50c3ff;
    }
  }
  .refresh {
    font-size: 12px;
    border-radius: 3px;
    display: inline-block;
    border: 1px solid #dcdfe6;
    color: #606266;
    background:#ffffff;
    height: 16px;
    padding: 5px 12px;
    margin-top: 7px;
    margin-left: 20px;
    cursor: pointer;
    &:hover{
      background:#EAFAFF;
    }
  }
  .cc {
    color: #50c3ff;
  }
}
</style>