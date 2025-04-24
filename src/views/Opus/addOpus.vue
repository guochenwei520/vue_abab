<template>
  <div class="form-container">
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
      <h3>上传海龟汤</h3>
      <el-form-item label="汤名" prop="opusTitle">
        <el-input v-model="ruleForm.opusTitle"/>
      </el-form-item>
      <el-form-item label="汤面" prop="opusName">
        <el-input v-model="ruleForm.opusName" type="textarea"/>
      </el-form-item>
      <el-form-item label="汤底" prop="opusMain">
        <el-input v-model="ruleForm.opusMain" type="textarea"/>
      </el-form-item>
      <el-form-item prop="location">
        <el-segmented v-model="ruleForm.location" :options="locationOptions"/>
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-checkbox-group v-model="ruleForm.typeId">
          <el-checkbox :value="i.typeId" v-for="i in typeData">{{ i.typeName }}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio value="原创">原创</el-radio>
          <el-radio value="转载">转载</el-radio>
          <el-radio value="改编">改编</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">上传提交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import {reactive, ref} from 'vue';
import router from "@/router/index.js";
import {getTypeAll} from "@/assets/type.js";
import {getOpusAdd} from "@/assets/opus.js";

const formSize = ref('default');
const ruleFormRef = ref(null);
const ruleForm = ref({
  opusTitle: '',
  opusName: '',
  opusMain: '',
  location: '',
  typeId: [], // 修正为数组类型
  resource: '',
  user: localStorage.getItem("user")
});
// 类型回显
const typeData = ref()

function typeList() {
  getTypeAll().then(res => {
    if (res.data.code === 200) {
      typeData.value = res.data.data
    }
  })
}

typeList()
const locationOptions = ['简单', '普通', '困难', '地狱难度'];
const rules = reactive({
  opusTitle: [{required: true, message: '请输入或选择内容', trigger: 'blur'}],
  opusName: [{required: true, message: '请输入或选择内容', trigger: 'blur'}],
  opusMain: [{required: true, message: '请输入或选择内容', trigger: 'blur'}],
  location: [{required: true, message: '请输入或选择内容', trigger: 'change'}],
  typeId: [{type: 'array', required: true, message: '请输入或选择内容', trigger: 'change'}],
  resource: [{required: true, message: '请输入或选择内容', trigger: 'change'}],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm.value)
      getOpusAdd(ruleForm.value).then(res => {
        router.push("/opusList")
      })
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7fa;
}

.demo-ruleForm {
  background-color: #fff;
  padding: 30px;
  padding-top: 0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.el-form-item {
  margin-bottom: 20px;
}

.el-form-item__label {
  font-weight: 600;
  color: #333;
}

.el-input,
.el-segmented,
.el-checkbox-group,
.el-radio-group {
  width: 100%;
}

.el-button {
  margin-right: 10px;
}

.el-button--primary {
  background-color: #409eff;
  border-color: #409eff;
}

.el-button--primary:hover {
  background-color: #66b1ff;
  border-color: #66b1ff;
}

.el-button--default {
  background-color: #fff;
  border-color: #dcdfe6;
  color: #606266;
}

.el-button--default:hover {
  background-color: #f4f4f5;
  border-color: #c0c4cc;
  color: #606266;
}

h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 48px;
  background: linear-gradient(45deg, #ff6b6b, #556270);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-top: 25px;
}
</style>
