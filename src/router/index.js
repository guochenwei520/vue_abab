import { createRouter, createWebHistory } from 'vue-router'
import OpusList from "@/views/Opus/OpusList.vue";
import UserList from "@/views/user/userList.vue";
import process from "@/views/Opus/process.vue";
import delList from "@/views/Opus/delList.vue";
import MyList from "@/views/Opus/MyList.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login.vue'),
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../layout/index.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('../views/home.vue'),
        },
        {
          path: '/OpusList',
          name: 'OpusList',
          component: OpusList
        },
        {
          path: '/process',
          name: 'process',
          component: process
        },
        {
          path: '/userList',
          name: 'userList',
          component: UserList
        },
        {
          path: '/delList',
          name: 'delList',
          component: delList
        },
        {
          path: '/MyList',
          name: 'MyList',
          component: MyList
        },
        {
          path: '/userLike',
          name: 'userLike',
          component: () => import('../views/user/userLike.vue'),
        },
      ]
    },
    {
      path: '/opus',
      name: 'opus',
      component: () => import('../views/Opus/addOpus.vue'),
    },
    {
      path: '/showOpus',
      name: 'showOpus',
      component: () => import('../views/Opus/showOpus.vue'),
    },
    {
      path: '/updateOpus',
      name: 'updateOpus',
      component: () => import('../views/Opus/UpdateOpus.vue'),
    },

  ],
})

router.beforeEach((to) => {
  if (to.path === '/') {
    return true;
  }
  const item = localStorage.getItem("photo");
  if (item) {
    return true;
  }
  return '/'; // 重定向到登录页
});

export default router;