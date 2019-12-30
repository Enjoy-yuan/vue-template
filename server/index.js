const Koa = require("koa");
const requireDirectory=require("require-directory")
const Router =require("koa-router")
// const book=require("./api/v1/book.js")
// const music=require("./api/v1/music.js")
const app = new Koa();

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

