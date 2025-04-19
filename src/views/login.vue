<template>
<!--{{typeList}}-->
  <div class="login-container">
    <!-- 左侧内容，包含 logo 和登录表单 -->
    <div class="left-section">
      <div class="logo">
      </div>

      <h2>用户登录</h2>
      <div class="separator"></div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">账号</label>
          <input
              type="text"
              id="username"
              v-model="loginForm.username"
              placeholder="请输入账号"
              required
          />
        </div>
        <div class="form-group">
          <label for="password">密码</label>
          <input
              type="password"
              id="password"
              v-model="loginForm.password"
              placeholder="请输入密码"
              required
          />
        </div>
        <div class="form-options">
          <label>
            <input type="checkbox" /> 记住我
          </label>
          <el-button link type="primary" @click="add()">
            去注册
          </el-button>
        </div>
        <button type="submit" class="login-button">登录</button>
      </form>
      <el-dialog
          v-model="dialogVisible"
          title="用户注册"
          width="300"
          :before-close="handleClose"
          class="custom-dialog"
      >
        头像：
        <el-upload
            class="avatar-uploader"
            action="/api/user/photo"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar"  style="width: 100px; height: 100px;" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
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
          <el-form-item prop="userName1">
            <el-input v-model="ruleForm.userName1" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="password2">
            <el-input v-model="ruleForm.password2" placeholder="请确认密码" @blur="result" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              注册
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import {getTypeAll} from "@/assets/type.js";
import {getLogin, getUserAdd, getUserDis} from "@/assets/user.js";
// // 测试
// const typeList = ref()
// function domeFun(){
//   getTypeAll().then(res =>{
//     typeList.value = res.data.data
//   })
// }
// domeFun()
const router = useRouter();
const dialogVisible = ref(false);
const loginForm = ref({
  username: '',
  password: '',
});

// 会话框关闭
function handleClose() {
  dialogVisible.value = false;
}

function add() {
  dialogVisible.value = true;
}

const imageUrl = ref('');

// 图片上传
const handleAvatarSuccess = (response) => {
  if (response.code === 200) {
    imageUrl.value = response.data;
    ruleForm.value.photo = response.data;
  }
};

// 注册
const formSize = ref('default');
const ruleForm = ref({
  userName1: '',
  username: '',
  password: '',

  photo: '',
});
const ruleFormRef = ref();

const validatePasswords = (rule, value, callback) => {
  if (value === ruleForm.value.password) {
    callback();
  } else {
    callback(new Error('两次密码不一致'));
  }
};
const rules = reactive({
  username: [
    {required: true, message: '请输入账号', trigger: 'blur'},
  ],
  userName1: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
  ],
  password2: [
    {required: true, message: '请确认密码', trigger: 'blur'},
    {validator: validatePasswords, trigger: 'blur'},
  ],
});

// 登录方法
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      getUserDis(ruleForm.value.username).then(res =>{
        if (res.data.code == 200){
          ElMessage.error("账号已存在")
          return null;
        }else{
          getUserAdd(ruleForm.value).then((res) => {
            if (res.data.code === 200) {
              ElMessage.success('注册成功');
              dialogVisible.value = false;
            }
          });
        }
      })
      console.log('submit!');
    } else {
      console.log('error submit!', fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

// 图片上传
const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!');
    return false;
  }
  return true;
};

// 登录
const handleLogin = () => {
 getLogin(loginForm.value).then((res) => {
    if (res.data.code === 200) {
      ElMessage.success('登录成功');
      // localStorage.setItem('photo', res.data.data.photo);
      localStorage.setItem('user', res.data.data.userName1);
      localStorage.setItem("userId", res.data.data.userId);
      router.push('/main');
    } else {
      ElMessage.error('登陆失败');
    }
  });
};
</script>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(5px);
}

.login-container {
  background-image: url('../assets/be6a248b1c27eaf4248019b24e0b485.jpg');
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  margin: 0;
}

.left-section {
  width: 50%;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 216, 214, 0.5);
  animation: fadeIn 0.6s ease-out;
  transition: transform 0.3s ease;
}

.left-section:hover {
  transform: scale(1.02);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.logo {
  margin-bottom: 1.5rem;
  text-align: center;
}

.logo img {
  max-width: 200px;
  height: auto;
  filter: drop-shadow(0 0 10px #00d8d6);
}

.separator {
  width: 80%;
  height: 2px;
  background-color: #00d8d6;
  margin: 0 auto 1.5rem;
  border-radius: 2px;
  animation: separatorFadeIn 0.8s ease-out;
  box-shadow: 0 0 10px #00d8d6;
}

@keyframes separatorFadeIn {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 80%;
    opacity: 1;
  }
}

h2 {
  text-align: center;
  color: #00d8d6;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  text-shadow: 0 0 10px #00d8d6;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  color: #d2dae2;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 0 5px #00d8d6;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #00d8d6;
  border-radius: 4px;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: #d2dae2;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
input[type="password"]:focus {
  outline: none;
  border-color: #00f2f2;
  box-shadow: 0 0 10px #00f2f2;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #d2dae2;
}

.login-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #00d8d6;
  color: #1e272e;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
  box-shadow: 0 0 10px #00d8d6;
}

.login-button:hover {
  background-color: #00f2f2;
  transform: scale(1.02);
  box-shadow: 0 0 20px #00f2f2;
}

.login-button:active {
  transform: scale(0.98);
}

.login-button:focus {
  outline: none;
  box-shadow: 0 0 20px #00f2f2;
}

/* 移动端适配 */
@media screen and (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }

  .left-section {
    width: 100%;
    margin: 0;
  }
}

/* 对话框样式 */
.custom-dialog {
  background: rgba(0, 0, 0, 0.7);
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 216, 214, 0.5);
  color: #d2dae2;
  /* 隐藏滚动条 */
  overflow: hidden;
}

.custom-dialog__header {
  border-bottom: 1px solid #00d8d6;
  padding: 1rem;
  color: #00d8d6;
  text-shadow: 0 0 10px #00d8d6;
}

.custom-dialog__body {
  padding: 1rem;
}

.el-form-item__label {
  color: #d2dae2;
  text-shadow: 0 0 5px #00d8d6;
}

.el-input__inner {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid #00d8d6;
  color: #d2dae2;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.el-input__inner:focus {
  outline: none;
  border-color: #00f2f2;
  box-shadow: 0 0 10px #00f2f2;
}

.el-button--primary {
  background-color: #00d8d6;
  border: none;
  box-shadow: 0 0 10px #00d8d6;
  transition: background-color 0.3s, transform 0.2s, box-shadow 0.3s;
}

.el-button--primary:hover {
  background-color: #00f2f2;
  transform: scale(1.02);
  box-shadow: 0 0 20px #00f2f2;
}

.el-button--primary:active {
  transform: scale(0.98);
}

.el-button--primary:focus {
  outline: none;
  box-shadow: 0 0 20px #00f2f2;
}
</style>