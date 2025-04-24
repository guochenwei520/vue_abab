<template>
  <div class="form-container">
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm[0]"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
      <h3>修改海龟汤</h3>
<!--      {{ruleForm.opusTypes}}-->
      <el-form-item label="汤名" prop="opusTitle">
        <el-input v-model="ruleForm[0].opusTitle" />
      </el-form-item>
      <el-form-item label="汤面" prop="opusName">
        <el-input v-model="ruleForm[0].opusName" type="textarea" />
      </el-form-item>
      <el-form-item label="汤底" prop="opusMain">
        <el-input v-model="ruleForm[0].opusMain" type="textarea" />
      </el-form-item>
      <el-form-item prop="location">
        <el-segmented v-model="ruleForm[0].location" :options="locationOptions" />
      </el-form-item>
      <el-form-item label="类型" prop="typeId">
        <el-checkbox-group v-model="ruleForm[0].typeId">
          <el-checkbox :value="i.typeId" v-for="i in typeData">{{i.typeName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item prop="resource">
        <el-radio-group v-model="ruleForm[0].resource">
          <el-radio value="原创">原创</el-radio>
          <el-radio value="转载">转载</el-radio>
          <el-radio value="改编">改编</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">上传修改</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue';
import router from "@/router/index.js";
import {getOpusList, insetOpus} from "@/assets/opus.js";
import {getTypeAll} from "@/assets/type.js";
const typeData= ref()
const formSize = ref('default');
const ruleFormRef = ref(null);
const ruleForm = ref([{
  opusId:null,
  opusTitle: '',
  opusName: '',
  opusMain: '',
  location: '',
  typeId: [],
  resource: '',
}]);
// 类型回显
function typeList(){
  getTypeAll().then(res=>{
    if (res.data.code === 200){
      typeData.value = res.data.data
    }
  })
}
typeList()
const locationOptions = ['简单', '普通', '困难', '地狱难度'];
const rules = reactive({
  opusTitle: [{ required: true, message: '请输入或选择内容', trigger: 'blur' }],
  opusName: [{ required: true, message: '请输入或选择内容', trigger: 'blur' }],
  opusMain: [{ required: true, message: '请输入或选择内容', trigger: 'blur' }],
  location: [{ required: true, message: '请输入或选择内容', trigger: 'change' }],
  typeId: [{ type: 'array', required: true, message: '请输入或选择内容', trigger: 'change' }],
  resource: [{ required: true, message: '请输入或选择内容', trigger: 'change' }],
});

const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm.value[0])
     insetOpus(ruleForm.value[0]).then(res =>{
        history.back()
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
const pageData = ref({
  pageNum: 1,
  pageSize: 20,
  opusId:localStorage.getItem("upId")
});
// 回显
function opusList(){
  getOpusList(pageData.value).then(res=>{
    if (res.data.code === 200){
      ruleForm.value=res.data.data.list
      //我的理解
      //使用map循环来遍历opusTypes数组里面的id将其赋值给ruleForm.value.opusTypes以实现回显，如果直接使用i.typeId会直接显示整个数组而不是单独数据的id
      //所以使用map来遍历我们的opusTypes数组将其一步一步的八id传过去

      //豆包解释
      //执行回调函数 typeId => typeId.typeId。回调函数会从每个对象中提取出 typeId 属性的值，然后 map 方法会返回一个新的数组，
      // 这个新数组就是仅包含 typeId 的数组。通过将这个新数组赋值给 ruleForm.value.opusTypes，就完成了数据格式的转换，使其符合多选框组件的要求，从而正确实现回显。
      ruleForm.value[0].typeId=res.data.data.list[0].opusTypes.map(typeId=>typeId.typeId)
    }
  })
}
opusList()
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
