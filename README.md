## 1.启动项目

- 安装依赖：yarn
- 启动本地环境：yarn serve
- 启动测试环境：yarn qa
- 启动生产环境：yarn build

## 2.项目登录

- 用户名：admin
- 密码：123456

## 3.项目功能

- 多环境配置
- 国际化
- 动态菜单
- 面包屑
- 标签导航
- 404 错误页面
- 富文本
- 弹出框可拖拽
- 按钮点击波纹动画
- 请求封装
- 请求进度条
- 按钮防抖
- 剪切板文字复制
- 时间格式化
- 高度自适应
- 封装 axios 请求
- Excel 导出
- 链接生成二维码
- canvas 转图片下载
- 百度地图
- Echarts 图表
- ESLint 代码检测
- gzip 压缩
- cdn 加速

## 4.addRoutes 动态路由

- 从后端获取的动态菜单需转成树状结构，通过递归组件生成多层级路由菜单
- 用变量保存所有动态路由，与后端返回的动态菜单中 url 对比筛选，通过 addRoutes 添加

## 5.双 token 校验

- 登录成功之后保存 refresh_token 和 access_token，以及它们的过期时间
- 在过期时间前一段时间，调用接口通过 refresh_token 重新获取 refresh_token 和 access_token
