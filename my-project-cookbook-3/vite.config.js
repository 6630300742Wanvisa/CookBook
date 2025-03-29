import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: true,  // ให้สามารถเข้าถึงจากภายนอกได้
    port: 5173,  // กำหนดพอร์ตให้แน่นอน
  }
 });
