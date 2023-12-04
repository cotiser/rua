<script setup lang="ts">
import Breadcrumb from "./Breadcrumb.vue";
</script>

<template>
  <el-header>
    <div class="partial-header"></div>
    <Breadcrumb></Breadcrumb>
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  position: fixed;
  top: 0px;
  left: var(--aside-width);
  z-index: 2;
  height: var(--header-height);
  width: calc(100% - var(--aside-width));
  padding: 0;

  .partial-header {
    background-color: rgba(255, 255, 255, 0.5);
    height: var(--partial-header-height);
    box-shadow: var(--el-box-shadow-light);
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: baseline;
  }
}
</style>
