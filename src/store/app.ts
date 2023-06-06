export const useAppStore = defineStore("app", () => {
  const theme = ref<string>("light");

  return { theme };
});
