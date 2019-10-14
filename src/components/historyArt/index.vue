<template>
  <div class="history-atr">
    <p>历史文章</p>
    <ul>
      <li
        v-for="data in artList"
        :key="data.id"
      >
        <p
          class="artname"
          v-text="data.name"
        ></p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "history-art",
  data() {
    return {
      artList: []
    };
  },
  created() {
    this.artList.push(...this.$store.getters["fileList"]);
    this.sortList()
  },
  computed: {
    getFile() {
      return this.$store.getters["fileList"];
    }
  },
  watch: {
    getFile(n, o) {
      console.log(n);
      this.artList.sort(...n);
      this.sortList()
    }
  },
  methods: {
    sortList() {
      this.artList.sort((a, b) => {
        return Number(a.date) - Number(b.date);
      });
    }
  }
};
</script>
<style lang="less" scope>
.history-atr {
  background: #ffffff;
  & > p {
    line-height: 40px;
    padding-left: 20px;
    font-size: 16px;
    color: #e9e9e9;
    border-bottom: 1px solid hsla(0, 0%, 58.8%, 0.1);
    color: #333;
  }
  li {
    display: block;
    padding: 8px 24px;
    cursor: pointer;
    background-color: hsla(0, 0%, 85.1%, 0.1);
    &:hover {
      background: hsla(0, 0%, 85.1%, 0.3);
    }
    & > p.artname {
      color: #333;
      font-size: 14px;
    }
  }
}
</style>