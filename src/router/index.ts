import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ROUTER_ROOT),
  routes: [
    {
      path: "/:notFound(.*)",
      redirect: "/404",
    },
    {
      path: "/404",
      name: "404",
      component: () => import("@/views/404.vue"),
      meta: { documentTitle: "你访问的页面不存在" },
    },
    {
      path: "/",
      component: () => import("@/layout/index.vue"),
      meta: { title: "首页" },

      children: [
        {
          path: "",
          component: () => import("@/views/index.vue"),
          meta: { documentTitle: "Welcome to Rua!" },
        },
        {
          path: "demo",
          meta: { title: "demo" },
          children: [
            {
              path: "",
              component: () => import("@/views/demo.vue"),
            },
          ],
        },
      ],
    },
  ],
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const { title, documentTitle } = to.meta;
  //console.log(to, from);

  // 设置页面文件标题
  document.title =
    documentTitle ?? (typeof title === "function" ? title(to) : title);
  next();
});

export default router;
