<script setup lang="ts">
const route = useRoute();

const collapseButtonIcon = ref("");
const isCollapsed = ref(false);
watchEffect(() => {
  if (isCollapsed.value) {
    collapseButtonIcon.value = "arrow-right";
    document.documentElement.style.setProperty(
      "--aside-width",
      "var(--aside-width-collapsed)"
    );
  } else {
    collapseButtonIcon.value = "arrow-left";
    document.documentElement.style.setProperty(
      "--aside-width",
      "var(--aside-width-expanded)"
    );
  }
});

const handleSelect = (key: string, keyPath: string[]) => {
  //console.log(key, keyPath);
};
</script>

<template>
  <el-aside>
    <el-menu
      :default-active="route.path"
      :ellipsis="true"
      :collapse="isCollapsed"
      router
      class="el-menu-demo"
      active-text-color="#b3ad14"
      @select="handleSelect"
    >
      <el-menu-item index="/" class="homepage"
        ><font-awesome-icon icon="home" /><span> 首页</span></el-menu-item
      >
      <el-divider />
      <el-menu-item index="/demo"
        ><font-awesome-icon icon="window-maximize" /><span
          >demo</span
        ></el-menu-item
      >
    </el-menu>
    <el-button class="collapse-button" @click="isCollapsed = !isCollapsed"
      ><font-awesome-icon :icon="collapseButtonIcon"
    /></el-button>
  </el-aside>
</template>

<style lang="scss">
.el-aside {
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;

  width: var(--aside-width);
  --menu-bg-color: rgb(50 66 103 / 80%);
  box-shadow: var(--el-box-shadow-dark);
  height: 100vh;
  background-color: var(--menu-bg-color);
  //backdrop-filter: blur(10px);

  .el-menu {
    background-color: transparent;
    //--el-menu-hover-bg-color: rgb(221, 221, 235);
    --el-menu-hover-bg-color: transparent;
    border: none;

    .is-active.el-menu-item {
      box-shadow: none;
    }

    .el-menu-item,
    .el-sub-item,
    .el-sub-menu__title {
      font-size: 1rem;
      //border-radius: 20px;
      color: white;

      &:hover {
        background-color: var(--el-menu-hover-bg-color);
      }
      .el-tag {
        margin-left: 0.3rem;
        .el-tag__content {
          font-size: 0.8rem;
        }
      }
    }

    .homepage {
      font-size: 1.3rem;
      font-weight: 700;
      box-shadow: none !important;

      &:hover {
        background-color: transparent;
      }
    }
  }

  .el-divider {
    border-color: rgba(255, 255, 255, 0.2);
  }
}

embed {
  margin-right: 0.5rem;
}

.collapse-button {
  position: fixed;
  bottom: 0;
  left: 0;
  margin: 0 0 10px 10px;
  min-width: 0px !important;
  max-width: 7vw;
  width: calc(var(--aside-width) - 40px);
  border: none !important;
  //border-radius: 100px !important;
  //box-shadow: var(--el-box-shadow-light);
  box-shadow: none !important;
  background-color: transparent;
  color: white;

  &:focus,
  &:hover {
    box-shadow: none !important;
    background-color: transparent;
    color: white;
  }
}
</style>
