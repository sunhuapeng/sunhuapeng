<template>
  <ul class="art-list">
    <li v-for="data in artData" :key="data.id">
      <div class="main">
        <div class="image">
          <img
            :src="data.coverPng?data.coverPng:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1570873494706&di=eb1afd97a7f996dcaaf82daa6e356b42&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F17%2F02%2F06%2Fed0c0ddc6271b0717ca64ffdf847eab6.jpg'"
          >
        </div>
        <div class="content">
          <p
            class="artlistname"
            v-text="data.name"
            @click="toArticle(data)"
          ></p>
          <div
            class="brief"
            v-text="data.brief"
          ></div>
          <p class="other">
            <span
              class="author"
              v-if="data.author"
            >
              <span class="iconfont">&#xe65c;</span>
              {{data.author}}
            </span>
            <span
              class="tag"
              v-if="data.tag"
            >
              <span class="iconfont">&#xe607;</span>
              {{data.tag}}
            </span>
            <span
              class="reprint"
              v-if="data.reprint"
            >
              <span class="iconfont">&#xe63e;</span>
              <a
                :href="data.reprint"
                target="view_window"
                v-text="'转载'"
              ></a>
            </span>
            <span
              class="date"
              v-if="data.date"
            >
              <span class="iconfont">&#xe613;</span>
              {{$dateFormet(data.date)}}
            </span>
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>
<script>

export default {
  name: "artlist",
  props:{
    artData:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      artList: []
    };
  },
  computed:{
  },
  created() {
    
  },
  methods: {
    toArticle(data) {
      this.$router.push({
        path: "/article",
        query: {
          id: data.id
        }
      });
    }
  }
};
</script>

<style lang="less" scrope>
.art-list {
  li {
    // height: 120px;
    width: 100%;
    box-sizing: border-box;
    padding: 0px 20px;
    position: relative;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #dddddd;

    p.artlistname {
      font-size: 20px;
      color: #50c3ff;
      line-height: 40px;
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .main {
      display: flex;
      div.image {
        flex: 1;
        height: 120px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 4px;
          border: 1px solid #f0f0f0;
        }
      }
      div.content {
        flex: 4;
        margin-left: 10px;
      }
      .brief {
        height: 55px;
        color: #999999;
      }
      .other {
        text-align: right;
        span {
          color: #999999;
          font-size: 14px;
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
    }
    & ~ li {
      margin-top: 20px;
    }
  }
}
</style>