//生成一个 express 实例 app，挂载了一个根路由控制器，然后监听 3000 端口并启动程序。
const express = require('express')
const app = express()

//当访问根路径时，依然返回 hello, express
app.get('/', function (req, res) {
  res.send('helloya, express')
})

//当访问如 localhost:3000/users/nswbmw 路径时，返回 hello, nswbmw
//路径中 :name 起了占位符的作用，可以通过 req.params.name 取到实际的值。
//express 使用了 path-to-regexp 模块实现的路由匹配。
app.get('/users/:name', function (req, res) {
    res.send('helloya, ' + req.params.name)
  })
  
app.listen(3000)

//实际开发中通常有几十甚至上百的路由，都写在 index.js 既臃肿又不好维护，
//这时可以使用 express.Router 实现更优雅的路由解决方案。--index2.js