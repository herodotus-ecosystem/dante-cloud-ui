// vite.config.ts
import { defineConfig } from "file:///D:/workspaces/Develop/dante-cloud-ui/node_modules/.pnpm/vite@5.1.6_@types+node@20.11.26_sass@1.71.1_terser@5.29.1/node_modules/vite/dist/node/index.js";
import dts from "file:///D:/workspaces/Develop/dante-cloud-ui/node_modules/.pnpm/vite-plugin-dts@3.7.3_@types+node@20.11.26_rollup@4.13.0_typescript@5.4.2_vite@5.1.6/node_modules/vite-plugin-dts/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\workspaces\\Develop\\dante-cloud-ui\\shared\\core";
var vite_config_default = defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  resolve: {
    alias: {
      "/@": path.resolve(__vite_injected_original_dirname, "src"),
      "/#": path.resolve(__vite_injected_original_dirname, "types")
    }
  },
  build: {
    lib: {
      entry: path.resolve(__vite_injected_original_dirname, "./src/index.ts"),
      name: "@herodotus/core",
      fileName: (format) => format === "es" ? `index.${format}.mjs` : `index.${format}.js`
    },
    minify: "terser",
    terserOptions: {
      // 生产环境下移除console
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      keep_classnames: true
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["qs", "lodash-es", "axios", "sweetalert2", "sm-crypto", "js-base64", "generate-avatar"],
      output: {
        assetFileNames: `assets/[name].[ext]`,
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          qs: "qs",
          "lodash-es": "lodashEs",
          axios: "axios",
          sweetalert2: "sweetalert2",
          "sm-crypto": "smCrypto",
          "js-base64": "jsBase64",
          "generate-avatar": "generateAvatar"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx3b3Jrc3BhY2VzXFxcXERldmVsb3BcXFxcZGFudGUtY2xvdWQtdWlcXFxcc2hhcmVkXFxcXGNvcmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXHdvcmtzcGFjZXNcXFxcRGV2ZWxvcFxcXFxkYW50ZS1jbG91ZC11aVxcXFxzaGFyZWRcXFxcY29yZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovd29ya3NwYWNlcy9EZXZlbG9wL2RhbnRlLWNsb3VkLXVpL3NoYXJlZC9jb3JlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcblxyXG5pbXBvcnQgZHRzIGZyb20gJ3ZpdGUtcGx1Z2luLWR0cyc7XHJcblxyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW1xyXG4gICAgZHRzKHtcclxuICAgICAgaW5zZXJ0VHlwZXNFbnRyeTogdHJ1ZVxyXG4gICAgfSlcclxuICBdLFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICcvQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcclxuICAgICAgJy8jJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3R5cGVzJylcclxuICAgIH1cclxuICB9LFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBsaWI6IHtcclxuICAgICAgZW50cnk6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9pbmRleC50cycpLFxyXG4gICAgICBuYW1lOiAnQGhlcm9kb3R1cy9jb3JlJyxcclxuICAgICAgZmlsZU5hbWU6IGZvcm1hdCA9PiAoZm9ybWF0ID09PSAnZXMnID8gYGluZGV4LiR7Zm9ybWF0fS5tanNgIDogYGluZGV4LiR7Zm9ybWF0fS5qc2ApXHJcbiAgICB9LFxyXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcclxuICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgLy8gXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU0RTBCXHU3OUZCXHU5NjY0Y29uc29sZVxyXG4gICAgICBjb21wcmVzczoge1xyXG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcclxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlXHJcbiAgICAgIH0sXHJcbiAgICAgIGtlZXBfY2xhc3NuYW1lczogdHJ1ZVxyXG4gICAgfSxcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgLy8gXHU3ODZFXHU0RkREXHU1OTE2XHU5MEU4XHU1MzE2XHU1OTA0XHU3NDA2XHU5MEEzXHU0RTlCXHU0RjYwXHU0RTBEXHU2MEYzXHU2MjUzXHU1MzA1XHU4RkRCXHU1RTkzXHU3Njg0XHU0RjlEXHU4RDU2XHJcbiAgICAgIGV4dGVybmFsOiBbJ3FzJywgJ2xvZGFzaC1lcycsICdheGlvcycsICdzd2VldGFsZXJ0MicsICdzbS1jcnlwdG8nLCAnanMtYmFzZTY0JywgJ2dlbmVyYXRlLWF2YXRhciddLFxyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBhc3NldEZpbGVOYW1lczogYGFzc2V0cy9bbmFtZV0uW2V4dF1gLFxyXG4gICAgICAgIC8vIFx1NTcyOCBVTUQgXHU2Nzg0XHU1RUZBXHU2QTIxXHU1RjBGXHU0RTBCXHU0RTNBXHU4RkQ5XHU0RTlCXHU1OTE2XHU5MEU4XHU1MzE2XHU3Njg0XHU0RjlEXHU4RDU2XHU2M0QwXHU0RjlCXHU0RTAwXHU0RTJBXHU1MTY4XHU1QzQwXHU1M0Q4XHU5MUNGXHJcbiAgICAgICAgZ2xvYmFsczoge1xyXG4gICAgICAgICAgcXM6ICdxcycsXHJcbiAgICAgICAgICAnbG9kYXNoLWVzJzogJ2xvZGFzaEVzJyxcclxuICAgICAgICAgIGF4aW9zOiAnYXhpb3MnLFxyXG4gICAgICAgICAgc3dlZXRhbGVydDI6ICdzd2VldGFsZXJ0MicsXHJcbiAgICAgICAgICAnc20tY3J5cHRvJzogJ3NtQ3J5cHRvJyxcclxuICAgICAgICAgICdqcy1iYXNlNjQnOiAnanNCYXNlNjQnLFxyXG4gICAgICAgICAgJ2dlbmVyYXRlLWF2YXRhcic6ICdnZW5lcmF0ZUF2YXRhcidcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThVLFNBQVMsb0JBQW9CO0FBRTNXLE9BQU8sU0FBUztBQUVoQixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFPekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0Ysa0JBQWtCO0FBQUEsSUFDcEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE1BQU0sS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNuQyxNQUFNLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdkM7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxLQUFLO0FBQUEsTUFDSCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUMvQyxNQUFNO0FBQUEsTUFDTixVQUFVLFlBQVcsV0FBVyxPQUFPLFNBQVMsTUFBTSxTQUFTLFNBQVMsTUFBTTtBQUFBLElBQ2hGO0FBQUEsSUFDQSxRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUE7QUFBQSxNQUViLFVBQVU7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxNQUNqQjtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsSUFDbkI7QUFBQSxJQUNBLGVBQWU7QUFBQTtBQUFBLE1BRWIsVUFBVSxDQUFDLE1BQU0sYUFBYSxTQUFTLGVBQWUsYUFBYSxhQUFhLGlCQUFpQjtBQUFBLE1BQ2pHLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBO0FBQUEsUUFFaEIsU0FBUztBQUFBLFVBQ1AsSUFBSTtBQUFBLFVBQ0osYUFBYTtBQUFBLFVBQ2IsT0FBTztBQUFBLFVBQ1AsYUFBYTtBQUFBLFVBQ2IsYUFBYTtBQUFBLFVBQ2IsYUFBYTtBQUFBLFVBQ2IsbUJBQW1CO0FBQUEsUUFDckI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
