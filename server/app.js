// const Koa = require("koa");
// const app = new Koa();

// app.use(async ctx => {
//   ctx.body = "hello";
// });

// app.listen("3000");

// node 后端服务器
const userApi = require("./api/userApi");
const movieApi = require("./api/movieApi");
const musicApi = require("./api/v1/music.js");
const singerApi = require("./api/singerApi");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 后端api路由
// app.use('/api/user', userApi);
// app.use('/api/movie', movieApi);
app.use("/api/music", musicApi);
// app.use('/api/singer', singerApi);

// 监听端口
app.listen(3000);
console.log("success listen at port:3000...");
