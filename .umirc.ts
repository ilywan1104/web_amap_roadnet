import { defineConfig } from 'umi';

export default defineConfig({
  title: '高德叠加路网-预览',
  nodeModulesTransform: {
    type: 'none',
  },
  publicPath: '/public/',
  favicon: '/public/favicon.png',
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  externals: {
    AMap: 'window.AMap',
    AMapUI: 'window.AMapUI'
  },
  scripts: [
    '//webapi.amap.com/maps?v=1.4.15&key=db3951933da715c9f10e0bd8c00b3574',
    '//webapi.amap.com/ui/1.0/main.js',
  ]
});
