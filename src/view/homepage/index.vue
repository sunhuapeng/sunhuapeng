<template>
  <div class="homepage">
    <div class="left-bar">
      <div class="search-box">
        <input
          type="text"
          v-model="search"
          @keydown.enter="searchEnterFun"
          placeholder="SEARCH"
        />
      </div>
      <div class="Modular">
        <h2>MENU</h2>
        <ul>
          <router-link
            tag="li"
            :to="data.router"
            active-class="menu-item-active"
            v-for="(data, index) in menuItem"
            :key="index"
            v-text="data.name"
          ></router-link>
        </ul>
      </div>
      <div class="Modular">
        <h2>HISTORY</h2>
        <art-list :type="'left-bar'" :artData="articleList"></art-list>
      </div>
    </div>
    <div class="view">
      <router-view class="roter-view"> </router-view>
    </div>
  </div>
</template>
<script>
import artlist from "@/components/artList";
import fileList from "@/common/js/getFile.js";
import artMain from "@/components/artMain";
import allView from "@/view/three-model/allView";
export default {
  name: "homepage",
  components: {
    "art-list": artlist,
    "art-main": artMain,
    "all-view": allView
  },
  data() {
    return {
      menuItem: [
        {
          name: "首页",
          router: "/home"
        },
        {
          name: "前端热门技术",
          router: "/web"
        },
        {
          name: "听说3D技术前景不错",
          router: "/threejs"
        },
        {
          name: "搞搞设计耍耍",
          router: "/design"
        },
        {
          name: "杂学笔记",
          router: "/note"
        },
        {
          name: "不增涉足的地方",
          router: "/journey"
        },
        {
          name: "陪她",
          router: "/her"
        },
        {
          name: "自恋一下",
          router: "/accompany"
        },
        {
          name: "不知道该写点啥",
          router: "/nothing"
        }
      ],
      search: "",
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
      fileList.fileList.then(res => {
        this.articleList = res;
      });
    },
    searchEnterFun() {
      console.log(this.search);
      // let newArr = [];
      // this.articleList = this.$store.getters["fileList"];
      // this.articleList.forEach(e => {
      //   if (this.search) {
      //     if (e.name.indexOf(this.search) !== -1) {
      //       newArr.push(e);
      //     }
      //     this.articleList = newArr;
      //   }
      // });
    }
  }
};
</script>
<style lang="less" scoped>
.homepage {
  width: 100%;
  display: flex;
  .left-bar {
    width: 360px;
    background: #f4f6f8;
    padding: 20px 60px 20px 60px;
    box-sizing: border-box;
    padding-bottom: 40px;
    .search-box {
      width: 100%;
      height: 46px;
      border: 1px solid #f4f6f8;
      background: #ffffff;
      border-radius: 6px;
      padding: 5px 10px;
      box-sizing: border-box;
      display: inline-block;
      input {
        display: inline-block;
        height: 100%;
        background: none;
        outline: none;
        border: 0px;
        font-size: 18px;
        color: #696969;
      }
    }

    ul {
      margin-top: 40px;
      li {
        height: 40px;
        line-height: 38px;
        border-bottom: 1px solid #909090;
        color: #696969;
        box-sizing: border-box;
        cursor: pointer;
        margin-top: 10px;
        &:hover {
          border-color: #ff6069;
          transition: all 0.2s linear 0s;
        }
        &.menu-item-active {
          border-color: #ff6069;
          color: #ff6069;
        }
      }
    }
    & + div.view {
      padding: 0 100px;
      width: calc(100% - 360px);
      box-sizing: border-box;
    }
  }
}
</style>
