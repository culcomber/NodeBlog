const express = require('express')
const app = express()

// app.use(function (req, res, next) {
//   console.log('1') //ReferenceError: res is not defined
// //   res.send('1')
//   next()
// })

// app.use(function (req, res, next) {
//   console.log('2')
// //   res.send('2') //ReferenceError: res is not defined
//   res.status(200).end()
// })

app.get('/users/:name', function (req, res,next) {
    res.send('hello, ' + req.params.name)
    next()
})

app.get('/', function (req, res,next) {
    res.send('hello, express')
    res.status(200).end()//需要才可以运行
})

app.listen(3000)