<template>
  <div class="case3d">
    <el-row :gutter="20">
      <el-col :span="12" v-for="(data, index) in caseNameList" :key="index">
        <div class="grid-content bg-purple" @click="openNewWindow(data)">
          {{ data }}
        </div>
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
        this.caseNameList.push(str);
      });
    }
  },
  methods:{
    openNewWindow(name){
      window.open("../../../static/three/" + name,'_blank');
    }
  }
};
</script>
