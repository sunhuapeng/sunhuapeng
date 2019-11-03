<template>
  <div class="homepage">
    <div class="left-bar">
      <div class="search-box">
        <input type="text" v-model="search" @keydown.enter="searchEnterFun" placeholder="SEARCH" />
      </div>
      <div class="Modular">
        <h2>MENU</h2>
        <ul>
          <router-link
            tag="li"
            :to="data.router"
            active-class="menu-item-active"
            v-for="(data,index) in menuItem"
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
    <div class="right-main">
      <div class="box"></div>
      <div class="Modular">
        <h2>I Am A Web Developer</h2>
        <p
          class="content"
        >你可能会问我，为什么要做一个这样的网站，这是一个好问题，其实想做自己的网站已经很久了，奈何工作的颠簸，生活的蹉跎，使它尘封、落灰；只是想简单的记录一下学习、生活，有关于技术的理解，也会分享一些经验或者喜欢的事物，你可以来来去去，或者留下你的痕迹，我们可以互相交流，互相分享、种草、追动漫，希望可以给对方一点快乐。</p>
      </div>
      <art-main></art-main>
    </div>
  </div>
</template>
<script>
import artlist from "@/components/artList";
import fileList from "@/common/js/getFile.js";
import artMain from "@/components/artMain";
export default {
  name: "homepage",
  components: {
    "art-list": artlist,
    "art-main": artMain
  },
  data() {
    return {
      menuItem: [
        {
          name: "首页",
          router: "/homepage"
        },
        {
          name: "杂学笔记",
          router: "/note"
        },
        {
          name: "听说3D技术前景不错",
          router: "/three"
        },
        {
          name: "搞搞设计耍耍",
          router: "/design"
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
  methods: {
    getFiles() {
      fileList.fileList.then(res => {
        this.$store.dispatch("fileList", res);
        console.log(res)
        this.articleList = this.$store.getters["fileList"];
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
  }
  .right-main {
    width: calc(100% - 360px);
    padding: 0 120px;
    .box {
      height: 460px;
      background: #f0f;
    }
    .content {
      margin-top: 40px;
      color: #909090;
      line-height: 28px;
    }
  }
}

</style>