<script setup lang="ts"></script>

<template>
  <section class="appmain">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </section>
</template>

<style scoped lang="scss">
.appmain {
  position: absolute;
  top: var(--header-height);
  left: var(--aside-width);
  height: calc(100vh - var(--header-height));
  width: calc(100vw - var(--aside-width) - var(--drawer-width));
}

/* 渐变设置 */
.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active {
  transition: all 0.5s ease;
}
.fade-leave-active {
  transition: all 0.5s ease;
}
</style>
