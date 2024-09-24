import path from 'path';
import { fileURLToPath } from 'url';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config) => {
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      console.log('Resolved __dirname:', __dirname); // 添加日志
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, 'components'), // 确保路径正确解析
      }
      return config
    },
  }
  
export default nextConfig
