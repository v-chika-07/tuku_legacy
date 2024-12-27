// vite.config.js
import { defineConfig } from "file:///C:/Users/Vusi/CascadeProjects/windsurf-project/zunzo-running-club-vite/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Vusi/CascadeProjects/windsurf-project/zunzo-running-club-vite/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    // Include sourcemaps for debugging
    minify: false,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          firebase: ["firebase/app", "firebase/firestore", "firebase/auth"]
        }
      },
      // Add this to resolve CSS imports
      external: [/^leaflet\/.*/]
    },
    chunkSizeWarningLimit: 1e3,
    sourcemap: false
  },
  server: {
    port: parseInt(process.env.VITE_PORT) || 3007,
    open: true,
    host: true
    // Listen on all local IPs
  },
  css: {
    // Add this to handle CSS imports
    preprocessorOptions: {
      css: {
        includePaths: ["node_modules"]
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxWdXNpXFxcXENhc2NhZGVQcm9qZWN0c1xcXFx3aW5kc3VyZi1wcm9qZWN0XFxcXHp1bnpvLXJ1bm5pbmctY2x1Yi12aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJjOlxcXFxVc2Vyc1xcXFxWdXNpXFxcXENhc2NhZGVQcm9qZWN0c1xcXFx3aW5kc3VyZi1wcm9qZWN0XFxcXHp1bnpvLXJ1bm5pbmctY2x1Yi12aXRlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9jOi9Vc2Vycy9WdXNpL0Nhc2NhZGVQcm9qZWN0cy93aW5kc3VyZi1wcm9qZWN0L3p1bnpvLXJ1bm5pbmctY2x1Yi12aXRlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcclxuICBidWlsZDoge1xyXG4gICAgc291cmNlbWFwOiB0cnVlLCAvLyBJbmNsdWRlIHNvdXJjZW1hcHMgZm9yIGRlYnVnZ2luZ1xyXG4gICAgbWluaWZ5OiBmYWxzZSwgICBcclxuICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICBvdXRwdXQ6IHtcclxuICAgICAgICBtYW51YWxDaHVua3M6IHtcclxuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxyXG4gICAgICAgICAgZmlyZWJhc2U6IFsnZmlyZWJhc2UvYXBwJywgJ2ZpcmViYXNlL2ZpcmVzdG9yZScsICdmaXJlYmFzZS9hdXRoJ10sXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICAvLyBBZGQgdGhpcyB0byByZXNvbHZlIENTUyBpbXBvcnRzXHJcbiAgICAgIGV4dGVybmFsOiBbL15sZWFmbGV0XFwvLiovXVxyXG4gICAgfSxcclxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcclxuICAgIHNvdXJjZW1hcDogZmFsc2VcclxuICB9LFxyXG4gIHNlcnZlcjoge1xyXG4gICAgcG9ydDogcGFyc2VJbnQocHJvY2Vzcy5lbnYuVklURV9QT1JUKSB8fCAzMDA3LFxyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIGhvc3Q6IHRydWUsIC8vIExpc3RlbiBvbiBhbGwgbG9jYWwgSVBzXHJcbiAgfSxcclxuICBjc3M6IHtcclxuICAgIC8vIEFkZCB0aGlzIHRvIGhhbmRsZSBDU1MgaW1wb3J0c1xyXG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICBjc3M6IHtcclxuICAgICAgICBpbmNsdWRlUGF0aHM6IFsnbm9kZV9tb2R1bGVzJ11cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBZ1osU0FBUyxvQkFBb0I7QUFDN2EsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCxXQUFXO0FBQUE7QUFBQSxJQUNYLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaLFFBQVEsQ0FBQyxTQUFTLGFBQWEsa0JBQWtCO0FBQUEsVUFDakQsVUFBVSxDQUFDLGdCQUFnQixzQkFBc0IsZUFBZTtBQUFBLFFBQ2xFO0FBQUEsTUFDRjtBQUFBO0FBQUEsTUFFQSxVQUFVLENBQUMsY0FBYztBQUFBLElBQzNCO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxJQUN2QixXQUFXO0FBQUEsRUFDYjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTSxTQUFTLFFBQVEsSUFBSSxTQUFTLEtBQUs7QUFBQSxJQUN6QyxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxFQUNSO0FBQUEsRUFDQSxLQUFLO0FBQUE7QUFBQSxJQUVILHFCQUFxQjtBQUFBLE1BQ25CLEtBQUs7QUFBQSxRQUNILGNBQWMsQ0FBQyxjQUFjO0FBQUEsTUFDL0I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
