//每个路由文件通过生成一个 express.Router 实例 router 并导出，通过 app.use 挂载到不同的路径。
//在 routes 目录下创建 index.js 和 users.js

const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000)

//我们只是返回纯文本给浏览器，现在我们修改代码返回一个 html 页面给浏览器。--index3.js