# vue-template
vue项目结构模板
```
¦--.browserslistrc			// 浏览器版本兼容
¦--.editorconfig			// 编辑器配置
¦--.eslintrc.js				// eslint配置
¦--.gitignore				// git忽略文件
¦--babel.config.js          // babel配置
¦--package.json             // 安装包
¦--postcss.config.js        // css处理器配置
¦--vue.config.js            // vue-cli3配置文件
¦--yarn.lock
+ public                     // 基础模板
¦------favicon.ico  
¦------index.html           // 首页模板，可引入cdn
¦------
+ src                        
----¦--App.vue      
----¦--main.js
----+ api                   // 存放所有请求
----¦------home.js          // 首页的请求
----¦------user.js          // 用户相关的请求
----+ assets                // 静态资源存储
----¦------logo.png
----+ components            // 公共组件库
----¦------Error.vue        // 错误组件
----¦------Loading.vue      // 转场loading
----¦------
----+ plugins               // vue相关插件
----¦------element.js       // elementui插件
----¦------
----+ router                // 路由库
----¦------hook.js          // 路由钩子
----¦------router.js        // 路由配置
----¦------
----+ store                 // vuex库
----¦-----index.js          
----¦-----types.js          // vuex常量
----¦--+ modules            // vuex模块
----¦----------home.js      
----¦----------
----+ utils                 // 工具库
----¦------direactives.js   // 全局指令
----¦------filters.js       // 全局过滤器
----¦------loadable.js      // 路由转场
----¦------request.js       // 请求库
----¦------validators.js    // 校验库
----¦------
----+ views                 // 页面库
--------+ Home              // 首页
--------¦------index.vue
--------¦------
--------+ Login             // 登录
----------------login.vue   // 登录页
----------------regesiter.vue   // 注册页

```
