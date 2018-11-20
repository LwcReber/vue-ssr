# About
这是慕课网上[Vue+Webpack打造todo应用](https://www.imooc.com/learn/935)课程的源码

# 使用方法
```
git clone https://github.com/Jokcy/vue-todo-tech.git
```
进入项目目录，运行
```
npm install
```
然后执行
```
npm run dev
开始开发项目

# 遇到的问题

  1. vue-server-renderer 使用2.5.13版本不能使用最新版本 使用cnpm 手动安装对应的版本号
  2. 使用nodemon自动重启服务 主要为了自动重启
  3. concurrently可同时启动多个服务
  4. 使用vue-meta 解决title问题


  5. 使用no-bundle的方式注意事项

    1. 如果使用的mfs的方式读取文件，则需要把client的路由写成同步加载的方式，因为mfs无法直接读取内存的文件
       webpack不需要vue-server-renderer
    2. 如果不使用mfs的方式则可以直接读取server-entry 文件，这样的话路由就可以使用异步加载的方式
      开发环境可以使用vue-server-renderer
