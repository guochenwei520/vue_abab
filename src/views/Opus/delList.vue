<template>
  <el-table :data="opusData" style="width: 100%">
    <el-table-column fixed prop="opusId" label="编号" width="80"/>
    <el-table-column fixed prop="opusTitle" label="汤名" width="150"/>
    <el-table-column label="汤面" width="200">
      <!-- 使用 scoped-slot 自定义单元格内容 -->
      <template #default="scope">
        <div class="col-name">{{ scope.row.opusName }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="location" label="难度" width="100"/>
    <el-table-column prop="resource" label="来源" width="100"/>
    <el-table-column #default="code" label="类型" width="100">
      <span v-for="i in code.row.opusTypes">{{ i.type.typeName }}&nbsp;</span>
    </el-table-column>
    <el-table-column prop="user" label="作者" width="120"/>
    <el-table-column fixed="right" label="操作" min-width="120">
      <template #default="code">
        <el-button link type="primary" size="small" @click="delOpus(code.row.opusId,code.row.opusTitle)">
          彻底删除
        </el-button>
        <el-button link type="primary" size="small" @click="huiOpus(code.row.opusId)">
          恢复
        </el-button>
        <el-button link type="primary" size="small" @click="opusShow(code.row.opusId)">查看详细</el-button>
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
      :total=total
      @size-change="handleSizeChange"z
      @current-change="handleCurrentChange"
  />
   <!--  展示对话框-->
  <el-dialog v-model="centerDialogVisible" title="确定删除" width="500" center>
    <span>
     {{ log.log }}
    </span>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="delOk()">
          确定
        </el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          关闭
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import axios from "axios";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";
// 对话框提示信息
let log = ref({
  log: ""
})
let flag = ""
const handleClick = () => {
  centerDialogVisible.value = true
  // 处理点击事件
};
let centerDialogVisible = ref(false)
const pageData = ref({
  pageNum: 1,
  pageSize: 20,
  flag: "listFalse",
  flags: "listTrue",
});
let id = 0

function delOpus(opusId, name) {
  log.value.log = "你确定彻底删除名为" + name + "的汤吗,删除后将不可恢复"
  handleClick()
  flag = opusId
  id = opusId
}
function delOk() {
  centerDialogVisible.value = false
  deleOpus(id)
}

// 彻底删除
function deleOpus(opusId) {
  axios({
    method: "post",
    url: "/api/Opus/opusDelete",
    params: {opusId: opusId}
  }).then(res => {
    if (res.data.code === 200) {
      ElMessage.success("删除成功")
      opusList()
    }
  })
}

// 恢复到作品列表
function huiOpus(id) {
  axios({
    method: "post",
    url: "/api/Opus/huiOpus",
    params: {opusId: id}
  }).then(res => {
    if (res.data.code === 200) {
      ElMessage.success("恢复成功")
      location.reload()
    }
  })
}

let total = ""
const opusData = ref();

function opusList() {
  axios({
    url: "/api/Opus/opusAll",
    method: "post",
    data: pageData.value,
  }).then((res) => {
    if (res.data.code === 200) {
      opusData.value = res.data.data.list;
      total = res.data.data.total
    }
  });
}

const handleSizeChange = (val) => {
  opusList()
}
const handleCurrentChange = (val) => {
  opusList()
}
opusList();

// 查看详细
function opusShow(id) {
  localStorage.setItem("opusId", id)
  localStorage.setItem("flagShow", "del")
  router.push("/showOpus")
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
</style>