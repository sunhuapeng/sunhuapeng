<template>
  <ul :class="type=='left-bar'?'bar-art':'main-art'">
    <el-row :gutter="25">
      <el-col
        :span="type=='left-bar'?24:6"
        v-for="data in artData"
        :key="data.id"
        class="col-bottom"
      >
        <li @click="toArticle(data)">
          <div class="main">
            <div class="image">
              <img
                :src="data.coverPng?data.coverPng:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570873494706&di=eb1afd97a7f996dcaaf82daa6e356b42&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F02%2F06%2Fed0c0ddc6271b0717ca64ffdf847eab6.jpg'"
              />
            </div>
            <div class="content">
              <p class="artlistname" v-text="data.name"></p>
              <div class="brief" v-if="type!=='left-bar'" v-text="sliceStr(data.brief)"></div>
              <p class="other">
                <!-- <span class="author" v-if="data.author&&type!=='left-bar'">
                  <span class="iconfont">&#xe65c;</span>
                  {{data.author}}
                </span>-->
                <span class="tag" v-if="data.tag&&type!=='left-bar'">
                  <span class="iconfont">&#xe607;</span>
                  {{data.tag}}
                </span>
                <!-- <span class="reprint" v-if="data.reprint&&type!=='left-bar'">
                  <span class="iconfont">&#xe63e;</span>
                  <a :href="data.reprint" target="view_window" v-text="'转载'"></a>
                </span>-->
                <span class="date" v-if="data.date">
                  <span class="iconfont">&#xe613;</span>
                  {{$dateFormet(data.date)}}
                </span>
              </p>
              <div class="into" v-if="type!=='left-bar'" @click="toArticle(data)">进入</div>
            </div>
          </div>
        </li>
      </el-col>
    </el-row>
  </ul>
</template>
<script>
export default {
  name: "artlist",
  props: {
    artData: {
      type: Array,
      default: []
    },
    type: {
      type: String,
      default: "left-bar"
    }
  },
  data() {
    return {
      artList: []
    };
  },
  computed: {},
  created() {},
  methods: {
    toArticle(data) {
      this.$router.push({
        path: "/article",
        query: {
          id: data.id
        }
      });
    },
    sliceStr(str) {
      return str.slice(0, 20) + "...";
    }
  }
};
</script>

<style lang="less" scoped>
.bar-art {
  li {
    padding: 20px 0;
    box-sizing: border-box;
    border-bottom: 1px solid #909090;
    cursor: pointer;
    &:hover .main .content .artlistname {
      color: #ff6069;
    }
    .main {
      display: flex;
      height: 100px;
      .image {
        width: 100px;
        height: 100%;
        position: relative;
        img {
          width: 100%;
          margin: auto;
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: auto;
        }
      }
      .content {
        width: calc(100% - 100px);
        height: 100%;
        padding-left: 20px;
        box-sizing: border-box;
        .artlistname {
          font-size: 18px;
          color: #696969;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          min-height:72px
        }
        .brief {
          font-size: 14px;
          margin-bottom: 10px;
          color: #696969;
        }
        .other {
          color: #696969;
        }
      }
    }
  }
}
.main-art {
  margin-top: 40px;
  background: #fff;
  overflow: hidden;
  .col-bottom {
    margin-bottom: 25px;
    min-width: 300px;
  }
  li {
    // width: 328px;
    height: 460px;
    border: 1px solid #f4f6f8;
    // float: left;
    background: #ffffff;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.21);
    & ~ li {
      // margin-left: 25px;
    }
    .image {
      width: 100%;
      height: 206px;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        margin: auto;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        margin: auto;
        transition: transform 0.2s linear 0s;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .content {
      padding: 20px;
      box-sizing: border-box;
      .artlistname {
        font-size: 18px;
        color: #ff6069;
        margin: 20px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
      }
      .brief {
        margin-bottom: 20px;
        color: #909090;
        height: 60px;
      }
      .other {
        color: #909090;
      }
    }
  }
  .into {
    width: 60px;
    height: 25px;
    border: 1px solid #909090;
    border-radius: 6px;
    color: #909090;
    text-align: center;
    line-height: 23px;
    margin-top: 20px;
    cursor: pointer;
    transition: all 0.2s linear 0s;
    &:hover {
      border-color: #ff6069;
      color: #ff6069;
    }

    // box-sizing:border-box;
  }
}

.artlistname {
}
</style>