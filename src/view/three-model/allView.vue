<template>
  <div class="three">
    <iframe class="iframe" :src="iframe.path" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: "three",
  data() {
    return {
      iframe: {
        path: "../../../static/three/全景图.html"
      }
    };
  },
  methods: {},
  mounted() {},
  created() {}
};
</script>
<style scoped>
.three,
.iframe {
  height: 100%;
  width: 100%;
}
</style>
