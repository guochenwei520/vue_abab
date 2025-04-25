<script setup>
  let role = localStorage.getItem("role");
</script>

<template>
    <el-col :span="24">
      <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
      >
        <el-menu-item index="/main">
          <el-icon><icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/OpusList">
          <el-icon><document /></el-icon>
          <span>作品列表</span>
        </el-menu-item>

        <el-menu-item index="/MyList">
          <el-icon><document /></el-icon>
          <span>我的作品</span>
        </el-menu-item>

        <el-menu-item index="/UserLike">
          <el-icon><document /></el-icon>
          <span>收藏列表</span>
        </el-menu-item>
        <el-menu-item index="/userList" v-if="role == 1">
          <el-icon><setting /></el-icon>
          <span>用户管理</span>
        </el-menu-item>
        <el-menu-item index="/delList" v-if="role == 1 || role ==2">
          <el-icon><setting /></el-icon>
          <span>最近删除</span>
        </el-menu-item>
      </el-menu>
    </el-col>

</template>

<style scoped>

</style>
