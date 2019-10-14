<template>
  <div class="main-home">
    <div class="main-left">
      <div class="main-content">
        <p class="iskpota">Discovery</p>
        <p class="iskpota">A brand-new self</p>
        <div class="article-entryb sun-btn">笔记列表</div>
      </div>
    </div>
    <div class="main-right">
      <div
        class="main-image"
        @mousemove="moveImg($event)"
        @mouseout="outImg($event)"
      >
        <img
          class="back-img"
          src="./image/back.png"
          alt=""
        >
        <img
          class="front-img"
          src="./image/front.png"
          alt=""
        >

      </div>
    </div>
  </div>
</template>

<script>
import menu from '@/common/js/getFile.js'
export default {
  name: 'Wel',
  data() {
    return {

    };
  },
  methods: {
    moveImg(el) {
      let backImg = document.querySelector('.main-image .back-img'),
        frontImg = document.querySelector('.main-image .front-img'),
        imgB = backImg.getBoundingClientRect(),
        imgF = backImg.getBoundingClientRect(),
        mouseX = el.pageX, //鼠标X坐标
        mouseY = el.pageY, //鼠标y坐标
        imgBX = imgB.x,//背景图的X值
        imgBY = imgB.y,  //背景图的Y值
        imgBW = imgB.width, //背景图的宽度
        imgBH = imgB.height, //背景图的高度
        imgFX = imgF.x,//前景图的X值
        imgFY = imgF.y,  //前景图的Y值
        biliX = (mouseX - imgBX) - imgBW / 2,
        biliY = (mouseY - imgBY) - imgBH / 2
      /*
        *背景图旋转的公式
        *(鼠标X坐标-图片的left值)-图片宽度/2>0 向左转
      */
      if (biliY > 0) {
        backImg.style.transform = `rotateX(${biliY / 80}deg) rotateY(${-biliX / 80}deg)`
        frontImg.style.top = `${-biliY / 50}px`
      } else {
        backImg.style.transform = `rotateX(${biliY / 80}deg) rotateY(${-biliX / 80}deg)`
        frontImg.style.top = `${-biliY / 50}px`
      }
      if (biliX > 0) {
        frontImg.style.left = `${-biliX / 50}px`
      } else {
        frontImg.style.left = `${-biliX / 50}px`
      }

    },
    outImg(el) {
      let backImg = document.querySelector('.main-image .back-img'),
        frontImg = document.querySelector('.main-image .front-img')
      backImg.style.transform = `rotateY(0deg)`
      backImg.style.transition = `all 0.1s linear 0s;`
      frontImg.style.left = `0px`
      frontImg.style.top = `0px`
    }
  }

}

</script>

<style lang="less" scropt>
/*
  *主色调配色  深色底
*/
@import "../../common/css/common.less";
.main-home {
  width: 1080px;
  display: flex;
  margin: auto;
  height: calc(100% - 100px);
  padding: 20px;
  box-sizing: border-box;
  & > div {
    flex: 1;
    height: 100%;
    &.main-left {
      background: @dark8;
      display: flex;
      .main-content {
        height: 540px;
        margin: auto 0;
        & > p:first-child {
          margin-top: 50px;
          font-size: 68px;
          color: @dark1;
          & ~ p {
            color: @dark3;
            font-size: 24px;
            margin-top: 20px;
          }
        }
        .article-entryb {
          margin-top: 70%;
        }
      }
    }
    &.main-right {
      & > .main-image {
        height: 100%;
        position: relative;
        transform: perspective(500px);
        transform-style: preserve-3d;
        & > img {
          width: 100%;
          margin: auto 0;
          bottom: 0;
          top: 0;
          left: 0;
          position: absolute;
        }
      }
    }
  }
}
</style>

