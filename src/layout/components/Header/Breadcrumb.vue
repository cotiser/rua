<script setup lang="ts">
import { RouteLocationMatched } from "vue-router";
import { ArrowRight } from "@element-plus/icons-vue";

const route = useRoute();
const breadList = ref<RouteLocationMatched[]>();
watchEffect(() => {
  const matched = route.matched;
  breadList.value = matched.filter((item) => item.meta.title);
});
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in breadList"
      :key="index"
      :to="item.path"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped lang="scss">
.el-breadcrumb {
  padding: 15px 30px;
}
</style>
