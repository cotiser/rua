import { URL, fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";
import { visualizer } from "rollup-plugin-visualizer";
// import { nodePolyfills } from ...;
import Inspect from "vite-plugin-inspect";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const elResolver = ElementPlusResolver({
    importStyle: "sass",
    directives: true,
  });

  return {
    base: env.VITE_APP_ROOT,
    resolve: {
      alias: {
        "~": fileURLToPath(new URL("./", import.meta.url)),
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      proxy: {
        [env.VITE_API_ENTRY]: {
          target: env.VITE_SERVER_URL,
          changeOrigin: true,
          rewrite(path) {
            return path.replace(new RegExp(`^${env.VITE_API_ENTRY}`), "");
          },
        },
      },
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [
          elResolver,
          IconsResolver({
            prefix: "Icon",
          }),
        ],
        imports: ["vue", "vue-router", "pinia"],
        dts: "src/type/auto-import.d.ts",
        dirs: ["src/api/", "src/store/"],
      }),
      Components({
        resolvers: [
          elResolver,
          IconsResolver({
            enabledCollections: ["ep"],
          }),
        ],
        dts: "src/type/components.d.ts",
      }),
      Icons({
        autoInstall: true,
      }),
      Inspect(),
      visualizer({ open: false }) /** true when you want to see the graph */,
    ],
  };
});
