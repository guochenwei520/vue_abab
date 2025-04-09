<template>
  <div class="common-layout">
    <el-container>
      <el-header class="custom-header" style="display: flex;justify-content: space-between">
        <div class="logo-container">
          <!-- 这里放置 logo 图片，需替换为实际的图片路径 -->
          <img src="../image/帮我生成一个阿巴阿巴艺术文字的logo矢量图.png" alt="Logo" className="logo"/>
        </div>
          <Header/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside/>
        </el-aside>
        <el-main class="main-content">
          <Main/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import Main from "./Main/index.vue"
import Aside from "./Aside/index.vue"
import Header from "./Header/index.vue"
// 这里可以添加逻辑代码，如果没有则可以留空
</script>
<style scoped>
/* 全局样式 */
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
}

/* 公共布局样式 */
.common-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 自定义头部样式 */
.custom-header {
  background: linear-gradient(to right, #f6f4f7, #ffffff);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: fadeInDown 0.5s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* logo 容器样式 */
.logo-container {
  margin-right: 20px;
}

/* logo 图片样式 */
.logo {
  height: 40px; /* 根据实际情况调整 logo 的高度 */
  width: auto;
}

/* 头部标题样式 */
.header-title {
  margin: 0;
  font-size: 24px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* 自定义主体内容样式 */
.custom-main {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 主体内容区域样式 */
.main-content {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.main-content p {
  margin: 0;
  color: #333;
  font-size: 16px;
}
</style>