<template>
  <div class="case3d Modular">
    <h2>THREE JS</h2>
    <el-row :gutter="20" class="case-main">
      <el-col :span="8" v-for="(data, index) in caseNameList" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div class="imgview">
            <img :src="data.img" alt class="image" />
          </div>
          <div style="padding: 14px;" class="bottom">
            <span v-text="data.name"></span>
            <div class="clearfix">
              <el-button @click="openNewWindow(data.name)" type="text" class="button">INTO</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "case3d",
  data() {
    return {
      caseNameList: []
    };
  },
  created() {
    const context = require
      .context("../../../static/three", true, /.(html)$/)
      .keys();
    if (context.length !== 0) {
      context.forEach(element => {
        let str = element.replace("./", "");
        this.$axios.get(`../../../static/three/${element}`).then(res => {
          var imgReg = /<img.*?(?:>|\/>)/gi;
          var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          var imgArr = res.data.match(imgReg); // arr 为包含所有img标签的数组
          if (imgArr) {
            let src = imgArr[0].match(srcReg);
            this.caseNameList.push({
              img: src[1],
              name: str.replace(".html", "")
            });
          }
        });
      });
    }
  },
  methods: {
    openNewWindow(name) {
      window.open("../../../static/three/" + name + '.html', "_blank");
    }
  }
};
</script>
<style lang="less" scoped>
.imgview {
  width: 100%;
  height: 300px;
  overflow: hidden;
  img{
    height:100%;
  }
}
.bottom {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.case-main{
  margin-top:40px
}
</style>
