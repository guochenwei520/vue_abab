<script setup>
let photo = localStorage.getItem("photo")
let user = localStorage.getItem("user")

function clear() {
  localStorage.clear()
}
</script>

<template>
  <div style="float: right; background: #0c7cd5 ; width: fit-content ; height: fit-content">
    <el-menu
        default-active="2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        router
    >
      <el-menu-item index="process">审核</el-menu-item>
<!--      <el-sub-menu index="2">-->
<!--        <template #title>Workspace</template>-->
<!--        <el-menu-item index="2-1">item one</el-menu-item>-->
<!--        <el-menu-item index="2-2">item two</el-menu-item>-->
<!--        <el-menu-item index="2-3">item three</el-menu-item>-->
<!--        <el-sub-menu index="2-4">-->
<!--          <template #title>item four</template>-->
<!--          <el-menu-item index="2-4-1">item one</el-menu-item>-->
<!--          <el-menu-item index="2-4-2">item two</el-menu-item>-->
<!--          <el-menu-item index="2-4-3">item three</el-menu-item>-->
<!--        </el-sub-menu>-->
<!--      </el-sub-menu>-->
      <el-menu-item index="/opus">上传</el-menu-item>
      <div>
<!--        <el-avatar :size="50" :src="photo" style="margin-left: 20px"/>-->

      </div>
      <p style="color: #000000; margin-left: 5px">{{ user }}</p>
      <el-menu-item index="/" @click="clear()">退出</el-menu-item>
    </el-menu>
    <div class="h-6"/>
  </div>
</template>

<style scoped>

</style>