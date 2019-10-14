<template>
  <div class="nav-page">
    <nav>
      <ul class="nav-list">
        <li
          v-for="(item,index) in navList"
          :key="index"
          @click="navClick(item)"
        ><span
            class="iconfont"
            v-html="item.name"
          ></span></li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'navpage',
  data() {
    return {
      navList: [
        { name: '&#xe60d;', route: 'home' },
        { name: '&#xea42;', route: 'tags' },
        { name: '&#xe60c;', route: 'search' },
      ],
    };
  },
  methods: {
    navClick(navto){
      this.$router.push(`/${navto.route}`)
    }
  }

}

</script>

<style lang="less" scropt>
@import "../../common/css/common.less";
.nav-page {
  height: 100px;
  width:1080px;
  margin:0 auto;
  nav {
    width: 100%;
    margin: auto;
    height: 100%;
    position: relative;
    .nav-list {
      width:170px;
      display: flex;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 32px;
      margin:auto 0;
      & > li {
        cursor: pointer;
        margin: 0 10px;
        border: 1px solid @dark6;
        width: 32px;
        height: 100%;
        text-align: center;
        line-height: 32px;
        border-radius: 50%;
        &:hover {
          border-color: @dark4;
          span {
            color: @dark4;
          }
        }
        span {
          font-size: 16px;
          color: @dark6;
        }
      }
    }
  }
}
</style>

