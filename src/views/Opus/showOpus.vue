<template>
  <div :class="themeClass" class="article-wrapper">
    <!-- 视频播放 -->
<!--    <video src="./7e6d8fdc6b3eea71717d225576b43149.mp4" loop muted autoplay></video>-->
    <div class="article-card" :class="{ 'fade-in': isArticleLoaded }">
      <header class="article-header" :class="{ 'fade-in-delay-1': isArticleLoaded }">
        <div class="header-bg"></div>
        <div class="header-content">
          <h1 class="article-title">{{ opusData?.[0]?.opusTitle }}</h1>
          <div class="article-meta">
            <span class="author">{{ opusData?.[0]?.user }}</span>
          </div>
        </div>
      </header>
      <div class="article-content" :class="{ 'fade-in-delay-2': isArticleLoaded }">
        <p
            v-if="opusData?.length"
            :key="0"
            :style="`--index: 0`"
            :class="{
            'paragraph-fade-in': isArticleLoaded && 0 % 2 === 0,
            'paragraph-fade-in-reverse': isArticleLoaded && 0 % 2 === 1
          }"
        >
          <h5>汤面</h5>
          <div v-html="formattedOpusData.opusName"></div>
          <h5>汤底</h5>
          <div v-html="formattedOpusData.opusMain"></div>
        </p>
        <div style="display: flex; justify-content: space-between; text-align: center">
          <el-button @click="resetForm()">退出</el-button>
          <div class="tan">
            <input type="text" placeholder="发送你的弹幕"> <button @click="ajs2()">发送</button>
          </div>
          <el-icon style="font-size: 30px; color: #ffc400" class="interactive" @click="like()">
            <StarFilled v-if="likeFlag" />
            <Star v-else />
          </el-icon>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, createApp, resolveDirective } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import App from "@/App.vue";
import { Star, StarFilled } from "@element-plus/icons-vue";
import { getUserLike, getUserLikeAdd, getUserLikeDel } from "@/assets/user.js";
import Login from "@/views/login.vue";
import { ElMessage } from "element-plus";
import {getOpusList} from "@/assets/opus.js";

// 收藏方法
let likeFlag = ref(false);
const userAdd = ref({
  userId: localStorage.getItem("userId"),
  opusId: localStorage.getItem("opusId")
});

function like() {
  likeFlag.value =!likeFlag.value;
  if (likeFlag.value) {
    getUserLikeAdd(userAdd.value).then(res => {
      if (res.data.code === 200) {
        ElMessage.success("收藏成功");
      }
    });
  } else {
    getUserLikeDel(userAdd.value).then(res => {
      if (res.data.code === 200) {
        ElMessage.success("取消收藏");
      }
    });
  }
}

const pageData2 = ref({
  pageNum: 1,
  pageSize: 20,
  userId: localStorage.getItem("userId"),
  opusId: localStorage.getItem("opusId")
});

function likeOK() {
  getUserLike(pageData2.value).then(ref => {
    if (ref.data.code === 200) {
      if (ref.data.data.total > 0) {
        likeFlag.value = true;
      }
    }
  });
}

likeOK();

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

function resetForm() {
  history.back();
}

// 作品数据
const opusData = ref([]);
// 请求参数
const pageData = ref({
  pageNum: 1,
  pageSize: 20,
  opusId: ''
});

// 加载状态
const isArticleLoaded = ref(false);
// 主题类名
const themeClass = ref('');

// 获取作品列表
const fetchOpusList = async () => {
  try {
    pageData.value.opusId = localStorage.getItem('opusId');
    const response = await getOpusList(pageData.value)
    if (response.data.code === 200) {
      opusData.value = response.data.data.list;
    } else {
      console.error('获取作品列表失败:', response.data.message);
    }
  } catch (error) {
    console.error('请求出错:', error);
  }
};

// 初始化数据
const initData = async () => {
  await fetchOpusList();
  setTimeout(() => {
    isArticleLoaded.value = true;
  }, 200);
};

// 计算属性，将opusName和opusMain中的\n替换为<br>
const formattedOpusData = computed(() => {
  if (!opusData.value ||!opusData.value.length) return { opusName: '', opusMain: '' };
  const opusName = opusData.value[0].opusName.replace(/\r\n|\n/g, '<br>');
  const opusMain = opusData.value[0].opusMain.replace(/\r\n|\n/g, '<br>');
  return {
    opusName,
    opusMain
  };
});

// 根据时间更新主题
const updateTheme = () => {
  const now = new Date();
  const hours = now.getHours();
  if (hours >= 6 && hours < 12) {
    themeClass.value = 'theme-morning';
  } else if (hours >= 12 && hours < 18) {
    themeClass.value = 'theme-afternoon';
  } else {
    themeClass.value = 'theme-night';
  }
};

// 弹幕
let put = ref(null);
setInterval(() => { ajs() }, 600);
let arr1 = ['这个好玩', '作者真是个天才', '再写一个吧', '哈哈哈哈哈笑死我了', '阿巴阿巴阿巴', '好玩，爱玩，下次还玩'];
let arr2 = [''];

function ajs2() {
  let ps = document.createElement('p');
  ps.classList.add('ps');
  if (!put.value || put.value.value === '') {
    return alert('弹幕为空');
  }
  ps.textContent = `${put.value.value}`;
  const wrapper = document.querySelector('.article-wrapper');
  if (wrapper) {
    wrapper.appendChild(ps);
  }
  let p = document.querySelectorAll('p');
  p[p.length - 1].style.backgroundColor = `rgb(${sj3()},${sj3()},${sj3()})`;
  p[p.length - 1].style.top = `${sj()}vh`;
  p[p.length - 1].style.left = `0`;

  put.value.value = '';
}

function ajs() {
  let ps = document.createElement('p');
  ps.classList.add('ps');
  ps.textContent = `${arr1[sj2()]}`;
  const wrapper = document.querySelector('.article-wrapper');
  if (wrapper) {
    wrapper.appendChild(ps);
  }
  let p = document.querySelectorAll('.ps');
  p[p.length - 1].style.backgroundColor = `rgb(${sj3()},${sj3()},${sj3()})`;
  p[p.length - 1].style.top = `${sj()}vh`;
  p[p.length - 1].style.left = `0`;
}

function sj() {
  return parseInt(Math.random() * 100);
}

function sj2() {
  return parseInt(Math.random() * arr1.length);
}

function sj3() {
  return parseInt(Math.random() * 256);
}

onMounted(async () => {
  await initData();
  updateTheme();
  // 每2秒检查一次时间并更新主题
  setInterval(updateTheme, 2 * 1000);
  put.value = document.querySelector('input');
  put.value.addEventListener('focus', function () {
    put.value.placeholder = ''
  });
  put.value.addEventListener('blur', function () {
    put.value.placeholder = '发送你的弹幕'
  });
  put.value.onkeydown = function (e) {
    if (e.key === 'Enter') {
      ajs2();
    }
  };
});
</script>

<style scoped>
/* 整体包装器 */
.article-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  /* 为背景颜色变化添加过渡效果 */
  transition: background 1s ease;
}

video {
  position: absolute;
  width: 100vw;
  height: 100%;
  z-index: -100;
}

.interactive:hover {
  cursor: pointer;
  background-color: #ffffff;
  opacity: 0.8;
  transition: all 0.5s ease;
  transform: scale(1.5);
}

/* 文章卡片 */
.article-card {
  width: 80%;
  max-width: 800px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in {
  opacity: 1;
  transform: translateY(0);
}

/* 文章头部 */
.article-header {
  position: relative;
  height: 250px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.header-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: skewY(-5deg);
  transform-origin: top left;
  z-index: 1;
  /* 为背景颜色变化添加过渡效果 */
  transition: background 1s ease;
}

.header-content {
  position: relative;
  z-index: 2;
  padding: 60px 30px;
  text-align: center;
  color: white;
}

.article-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.article-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  opacity: 0.8;
}

.author,
.publish-time {
  margin: 0 10px;
}

.fade-in-delay-1 {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.2s;
}

/* 文章内容 */
.article-content {
  padding: 30px;
  line-height: 1.8;
  font-size: 16px;
  color: #333;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in-delay-2 {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.4s;
}

.paragraph-fade-in {
  opacity: 0;
  transform: translateX(-20px);
  animation: paragraphFadeIn 0.8s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

.paragraph-fade-in-reverse {
  opacity: 0;
  transform: translateX(20px);
  animation: paragraphFadeInReverse 0.8s ease forwards;
  animation-delay: calc(var(--index) * 0.1s);
}

@keyframes paragraphFadeIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes paragraphFadeInReverse {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 早上主题 */
.theme-morning.article-wrapper {
  background: linear-gradient(135deg, #c9e2ff 0%, #e0f0ff 100%);
}

.theme-morning .header-bg {
  background: linear-gradient(45deg, #007BFF 0%, #00C6FF 100%);
}

/* 下午主题 */
.theme-afternoon.article-wrapper {
  background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);
}

.theme-afternoon .header-bg {
  background: linear-gradient(45deg, #FFC107 0%, #FF9800 100%);
}

/* 晚上主题 */
.theme-night.article-wrapper {
  background: linear-gradient(135deg, #ffafaf 0%, #283593 100%);
}

.theme-night .header-bg {
  background: linear-gradient(45deg, #86faff 0%, #333333 100%);
}

.theme-night .article-title,
.theme-night .article-meta {
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-card {
    width: 95%;
  }

  .article-title {
    font-size: 28px;
  }

  .article-content {
    font-size: 15px;
  }
}

.button1 {
  z-index: 1000;
  width: 5vw;
  height: 4vh;
  color: #fff;
  background-color: rgba(150, 255, 220);
  font-size: 2dvb;
  border: none;
}

:deep(.ps) {
  font-size: 2dvb;
  width: fit-content;
  height: 4vh;
  border-radius: 5dvb;
  color: #fff;
  padding: 0 2vw;
  position: absolute;
  animation: yidong 5s linear;
  text-align: center;
  animation-fill-mode: forwards;
  line-height: 4vh;
  opacity: 0.7;
}

@keyframes yidong {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(80vw);
    display: none;
  }
}

.tan {
  z-index: 110;
  width: 20vw;
  height: 4vh;
  display: flex;
  background-color: #ffffff;
  position: absolute;
  bottom: 35px;
  left: 0px;
  right: 0px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5vw;
  overflow: hidden;
}

.tan input {
  background-color: rgba(255, 255, 255, 0.5);
  width: 15vw;
  height: 4vh;
  border: none;
  outline: none;
  text-indent: 1em;
  font-size: 2dvb;
}
</style>
