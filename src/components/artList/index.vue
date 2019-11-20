<template>
  <ul class="artlist">
    <li v-for="data in artData" :key="data.id" class="card" @click="toArticle(data)">
      <div class="content">
        <div class="meta-row">
          <ul class="meta-list">
            <li class="major-tag" v-text="data.tag[0]"></li>
            <li class="author" v-text="data.author"></li>
            <li class="date" v-text="$dateFormet(data.date)"></li>
            <li class="tag">
              <span v-for="(item,index) in data.tag" :key="item">
                <span v-if="index > 0" v-text="` ${item}  ${index<data.tag.length-1?'/':''}`"></span>
              </span>
            </li>
          </ul>
        </div>
        <div class="title-row" v-text="data.name"></div>
        <div class="brief" v-text="data.brief"></div>
        <div class="talk-length">
          <i class="el-icon-chat-square"></i>
          <span v-text="data.talkLength"></span>
        </div>
      </div>
      <div class="img">
        <img :src="data.coverPng" alt />
      </div>
    </li>
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
      artlist: []
    };
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {
    artData(newV, oldV) {
      // this.getTalkId(newV);
    }
  },
  methods: {
    toArticle(data) {
      this.$router.push({
        path: "/article",
        query: {
          id: data.id
        }
      });
    },
    sliceStr(str, n) {
      return str.length < n ? str : str.slice(0, n) + "...";
    }
  }
};
</script>

<style lang="less" scoped>
ul {
  width: 100%;
  .card {
    cursor: pointer;
    width: calc(100% - 30px);
    height: 109px;
    border-bottom: 1px solid rgba(178, 186, 194, 0.15);
    padding: 15px 20px;
    display: flex;
    &:hover {
      background: #fafafa;
    }
    &:hover .talk-length {
      display: block;
    }
    .meta-row {
      color: #b2bac2;
      .meta-list {
        display: flex;
        align-items: baseline;
        white-space: nowrap;
        & > li {
          font-size: 14px;
        }
        & > li ~ li {
          margin-left: 20px;
        }
        li.major-tag {
          color: #ff6069;
        }
      }
    }
    li.tag {
      display: flex;
      align-items: baseline;
      white-space: nowrap;
    }
  }

  .img {
    height: 100%;
    width: 109px;
    display: flex;
    justify-content: center;
    justify-items: center;
    overflow: hidden;
    img {
      height: 100%;
      display: block;
    }
  }
  .content {
    width: calc(100% - 109px);
  }
  .title-row {
    margin: 10px 0 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;
  }
  .talk-length {
    font-size: 14px;
    margin: 10px 0 10px;
    display: none;
    span {
      margin-left: 5px;
    }
  }
  .brief {
    color: #b2bac2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
  }
}
.artlist{
  margin-top:40px;
}
</style>
