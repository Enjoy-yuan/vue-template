## 1.启动项目

- 安装依赖：yarn
- 启动本地环境：yarn serve
- 打包测试环境：yarn qa
- 打包生产环境：yarn build

## 2.项目登录

- 用户名：admin/user
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
- 音乐播放
- 通过 npm 抽离公共的自定义组件和函数方法
- 接入 qiankun 微前端

## 4.addRoutes 动态路由实现

- 登录成功后从后端获取动态路由菜单，并将其存入 cookie 中
- 在登录页面下将其改造，并通过 addRoutes 加入菜单中，addRoutes 有覆盖效果
- 在菜单配置页面需将菜单数据转成树状结构，然后通过递归组件生成多层级路由菜单
- 此时刷新页面动态路由菜单会丢失，需在 main.js 中通过 addRoutes 再次加入动态菜单

## 5.双 token 校验

- 登录成功之后保存 refresh_token 和 access_token，以及它们的过期时间
- 在过期时间前一段时间，调用接口通过 refresh_token 重新获取 refresh_token 和 access_token

## 6.系统管理

- 系统菜单：在该页面配置所有的菜单，配置项包括菜单中文名称，菜单英文名称，菜单 url 路径，菜单图标，菜单父目录，菜单序号等
- 角色管理：在该页面配置角色，不同的角色配置不同的菜单
- 用户管理：基于角色创建用户，可使用用户名和密码登录，只可访问该角色下的菜单

## 7.qiankun 微前端接入

- 后台管理项目过大会导致代码编译过慢，内存泄漏，不易管理维护等诸多问题
- router-view 外不得使用 transition 包裹，会导致 dom 未加载的报错
- 到域名解析中添加主机记录：vue2，vue3，react
- 微前端的子应用需要在 nginx 中设置域名允许被跨域
- 基座的注册和启动子应用不要放到 main.js 中，应该放到挂载页面的 mounted 生命周期中，确保 dom 已经加载
- 与 CDN 可能会冲突
