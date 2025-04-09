<template>
  <!--  <p>在阿巴阿巴的世界里，你可以像是一朵轻盈的云朵，在蓝天白云间自由飘荡，让你的心灵得到片刻的放松。</p>-->
  <p>欢迎进入系统主页</p>
  <el-carousel
      height="400px"
      direction="vertical"
      type="card"
      :autoplay="false"
  >
    <el-carousel-item v-for="(item, index) in lunb" :key="index">
      <el-image :src="item" class="carousel-image"></el-image>
      <el-image :src="item" class="carousel-image"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script setup>
import lunb1 from './lunb/lunb1.jpg';
import lunb2 from './lunb/lunb2.jpg';
import lunb3 from './lunb/lunb3.jpg';
import lunb4 from './lunb/lunb4.jpg';
const lunb = [
  lunb1,
  lunb2,
  lunb3,
  lunb4

];
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

p {
  font-family: 'Roboto', sans-serif;
  font-size: 17px;
  color: #e0f7fa;
  line-height: 1.7;
  background: linear-gradient(135deg, #00ffd3, #5f6060);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 230, 118, 0.3);
  margin: 20px;
}

/* 新增图片样式 */
.carousel-image {
  width: 50%;
  height: 100%;
}
</style>