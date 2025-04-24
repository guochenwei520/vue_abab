<template>
  <h1 class="modern-title">海龟汤
    <el-input v-model="pageData.opusTitle" style="width: 240px" placeholder= "搜索汤名" />
    <el-select
        v-model="pageData.typeIds"
        placeholder="请选择类型"
        style="width: 240px"
    >
      <el-option
          v-for="item in typeData"
          :key="item.typeId"
          :label="item.typeName"
          :value="item.typeId"
      />
    </el-select>
    <el-button type="success" @click = "opusList()">搜索</el-button>
  </h1>
  <el-table :data="opusData" style="width: 100%" class="game-table">
    <el-table-column fixed prop="opusId" label="编号" width="80" />
    <el-table-column fixed prop="opusTitle" label="汤名" width="150" />
    <el-table-column label="汤面" width="200">
      <!-- 使用 scoped-slot 自定义单元格内容 -->
      <template #default="scope">
        <div class="col-name">{{ scope.row.opusName }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="location" label="难度" width="100" />
    <el-table-column prop="resource" label="来源" width="100" />
    <el-table-column #default="code" label="类型" width="100">
      <span v-for="i in code.row.opusTypes">{{i.type.typeName}}&nbsp;</span>
    </el-table-column>
    <el-table-column prop="user" label="作者" width="120" />
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="code">
        <el-button link type="primary" size="small" @click="delOpus(code.row.opusId,code.row.opusTitle)"
                   class="game-operation-button">
          <i class="el-icon-delete"></i> 删除
        </el-button>
        <el-button link type="primary" size="small" @click="updateOpus(code.row.opusId)"
                   class="game-operation-button">
          <i class="el-icon-edit"></i> 修改
        </el-button>
        <el-button link type="primary" size="small" @click="opusShow(code.row.opusId)"
                   class="game-operation-button">
          <i class="el-icon-info"></i> 查看详细
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      v-model:current-page="pageData.pageNum"
      v-model:page-size="pageData.pageSize"
      :page-sizes="[5, 10, 20, 30]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      class="game-pagination"
  />
  <!--  展示对话框-->
  <el-dialog v-model="centerDialogVisible" title="确定删除" width="500" center class="game-dialog">
    <span>
     {{log.log}}
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="delOk()" class="game-button">
          <i class="el-icon-check"></i> 确定
        </el-button>
        <el-button type="primary" @click="centerDialogVisible = false" class="game-button">
          <i class="el-icon-close"></i> 关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import router from "@/router/index.js";
import { ElMessage } from "element-plus";
import {getTypeAll} from "@/assets/type.js";
import {getOpusDel, getOpusList} from "@/assets/opus.js";

// 对话框提示信息
let log = ref({
  log: ""
});
let flag = "";
const handleClick = () => {
  centerDialogVisible.value = true;
  // 处理点击事件
};
let centerDialogVisible = ref(false);
const pageData = ref({
  pageNum: 1,
  pageSize: 20,
  flag: "listTrue",
  flags: "listTrue",
  opusTitle:"",
  typeIds:""
});

function delOpus(opusId, name) {
  log.value.log = "你确定删除名为" + name + "的汤吗";
  handleClick();
  flag = opusId;
}

function delOk() {
  centerDialogVisible.value = false;
  getOpusDel(flag).then(res => {
    if (res.data.code == 200) {
      ElMessage.success("删除成功");
      location.reload();
    }
  });
}

let total = "";
const opusData = ref();

function opusList() {
  getOpusList(pageData.value).then((res) => {
    if (res.data.code === 200) {
      opusData.value = res.data.data.list;
      total = res.data.data.total;
    }
  });
}
// 类型回显
const typeData= ref([])
function typeList(){
  getTypeAll().then(res=>{
    if (res.data.code === 200){
      typeData.value = res.data.data
    }
  })
}
typeList()
const handleSizeChange = (val) => {
  pageData.value.pageSize = val;
  opusList();
}

const handleCurrentChange = (val) => {
  pageData.value.pageNum = val;
  opusList();
}

opusList();

// 查看详细
function opusShow(id) {
  localStorage.setItem("opusId", id);
  router.push("/showOpus");
}

// 修改传id值
function updateOpus(id) {
  localStorage.setItem("upId", id);
  router.push("/updateOpus");
}
</script>

<style scoped>
.col-name {
  width: 180px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 显示两行 */
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 引入卡通风格的字体 */
@import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');

.modern-title {
  font-family: 'Comic Neue', cursive;
  font-size: 40px;
  text-align: left;
  color: #489100;
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  margin: 0;
  overflow: hidden;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #e6ffd9, #d1ff00); /* 初始背景渐变 */
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 主标题悬停效果 */
.modern-title:hover {
  color: #007bff;
  transform: scale(1.05);
  background: linear-gradient(135deg, #d1ff00, #e6ffd9);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* 动态光影动画 */
.modern-title::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  animation: lightEffect 2s infinite linear;
}

/* 表格样式 */
.game-table {
  border: none; /* 去除表格边框 */
  background-color: #f8f9fa; /* 表格背景色 */
  border-radius: 8px; /* 表格圆角 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 表格阴影 */
  overflow: visible; /* 确保表格不会裁剪悬停放大的行 */
}

.game-table .el-table__header th {
  background-color: #2c3e50; /* 表头背景色 */
  color: #ecf0f1; /* 表头文字颜色 */
  border: none; /* 去除表头边框 */
}

.game-table .el-table__body tr {
  transition: all 0.3s ease; /* 过渡动画 */
}

/* 表格行悬停效果 */
.game-table .el-table__body tr:hover {
  background-color: #3498db !important;
  color: #ffffff !important;
  -webkit-transform: scale(1.05) !important;
  -moz-transform: scale(1.05) !important;
  -ms-transform: scale(1.05) !important;
  -o-transform: scale(1.05) !important;
  transform: scale(1.05) !important;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
  z-index: 1 !important;
}

.game-table .el-table__body td {
  border: none; /* 去除单元格边框 */
}

/* 操作按钮悬停效果 */
.game-operation-button:hover {
  color: #489100;
  transform: scale(1.1);
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

/* 分页按钮悬停效果 */
.game-pagination .el-pagination__button:hover {
  background: #489100;
  color: white;
}

/* 对话框样式 */
.game-dialog {
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 光影动画关键帧 */
@keyframes lightEffect {
  to {
    left: 100%;
  }
}
</style>