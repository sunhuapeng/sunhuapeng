<template>
  <div :class="type==='nav'?'nav-bar':'footer-bar'">
    <ul>
      <li
        v-for="data in navList"
        @click="routerTo(data.router)"
      >
        <span v-text="data.name"></span>
        <div class="b-bar"></div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  props: {
    type: {
      type: String,
      default: "nav"
    }
  },
  data() {
    return {
      navList: [
        {
          name: "首页",
          router: "homepage"
        },
        {
          name: "学习天地",
          router: "xxtd"
        },
        {
          name: "案例",
          router: "al"
        },
        {
          name: "初入掠影",
          router: "crly"
        },
        {
          name: "低调亮相",
          router: "ddlx"
        }
      ]
    };
  },
  methods: {
    routerTo(data) {
      this.$router.push({
        path: `/${data}`
      });
    }
  }
};
</script>
<style lang="less" scope>
.nav-bar {
  height: 40px;
  border-left: 6px solid #50c3ff;
  box-sizing: border-box;
  line-height: 40px;
  background: #ffffff;

  ul {
    display: flex;
    width: 460px;
    margin: 0 auto;
    text-align: center;
    // justify-content: space-around;
    li {
      // width: 80px;
      cursor: pointer;
      position: relative;
      padding: 0 20px;
      box-sizing: border-box;
      transition: color 0.2s linear 0s;
      div.b-bar {
        height: 2px;
        width: 0;
        position: absolute;
        bottom: 2px;
        left: 0;
        background: #50c3ff;
        transition: all 0.2s linear 0s;
      }
      &:hover {
        color: #50c3ff;
        & > div {
          width: 100%;
        }
      }
    }
  }
}
.footer-bar{
  width:360px;
  height:40px;
  line-height:40px;
  text-align:center;
  ul{
    width:100%;
    height:100%;
    display:flex;
    li{
      padding:0 10px;
      cursor: pointer;
      color:#ffffff;
      font-size:14px;
    }
  }
}
</style>