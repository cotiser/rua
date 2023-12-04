<script setup lang="ts">
import { Subscription, client, subscribe, unsubscribe } from "@/utils/mqtt";

const trajectory_lstm = {
  topic: "/smarthome/sensor/mmwave/trajectory_lstm",
  qos: 0,
};

const trajectory_mlp = {
  topic: "/smarthome/sensor/mmwave/trajectory_mlp",
  qos: 0,
};

const trajectory = ref<Subscription>(trajectory_lstm);
watch(trajectory, (newVal, oldVal) => {
  unsubscribe(oldVal);
  subscribe(newVal);
});

onMounted(() => {
  subscribe(trajectory.value);
});

onUnmounted(() => {
  unsubscribe(trajectory.value);
});
</script>

<template>
  <div>
    <h1>WIP: Dashboard</h1>
    <el-button @click="trajectory = trajectory_mlp">toggle to mlp</el-button>
  </div>
</template>
