const Koa = require("koa");
const requireDirectory=require("require-directory")
// const Router =require("koa-router")
// const book=require("./api/v1/book.js")
// const music=require("./api/v1/music.js")
const app = new Koa();
const mysql= require("mysql")
const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "node-koa",
    port: "3306"
})

db.connect(err=>{
    if(err) throw err;
    console.log("成功连接数据库！")
})
// app.use(book.routes())
// app.use(music.routes())

requireDirectory(module,'./api',{
    visit: whenLoadModule
})

function whenLoadModule(obj){
    // console.log(obj)
    // if(obj instanceof Router){
        app.use(obj.routes())
    // }
    
}

app.listen("3000");

