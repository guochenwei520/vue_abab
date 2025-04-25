<template>
  <el-table :data="userList" style="width: 100%">
    <el-table-column fixed prop="userId" label="用户ID" width="150" />
    <el-table-column label="头像" #default="code">
      <el-avatar :size="50" :src="code.row.photo"/>
    </el-table-column>
    <el-table-column prop="userName1" label="用户名" width="120" />
    <el-table-column prop="username" label="账号" width="120" />
    <el-table-column #default="code" label="权限" width="120" >
      <span>{{code.row.uname}}</span>
    </el-table-column>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          删除
        </el-button>
        <el-button link type="primary" size="small">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="pageData.pageNum"
      v-model:page-size="pageData.pageSize"
      :page-sizes="[5, 10, 20, 100]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="game-pagination"
  />
</template>

<script setup>
import { ref } from 'vue';
import {getUserAll} from "@/assets/user.js";

const userList=ref()
const pageData=ref({
  pageNum:1,
  pageSize:20
})
const total = ref()
function userData(){
 getUserAll(pageData.value).then(res=>{
    if (res.data.code === 200){
      userList.value=res.data.data.records
      total.value = res.data.data.total
    }
  })
}
// 分页
const handleSizeChange = (val) => {
  pageData.value.pageSize = val;
  userData();
}

const handleCurrentChange = (val) => {
  pageData.value.pageNum = val;
  userData();
}
userData()
// location.reload()
</script>

<style scoped>
h1 {
  text-align: center;
  color: #333;
}

.custom-table th,
.custom-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.custom-table th {
  background-color: #f5f5f5;
  color: #333;
}

.custom-table tbody tr:hover {
  background-color: #f9f9f9;
}

.custom-table button {
  padding: 6px 12px;
  margin-right: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-table button:nth-child(1) {
  background-color: #2196F3;
  color: white;
}

.custom-table button:nth-child(1):hover {
  background-color: #0b7dda;
}

.custom-table button:nth-child(2) {
  background-color: #f44336;
  color: white;
}

.custom-table button:nth-child(2):hover {
  background-color: #da190b;
}
</style>
