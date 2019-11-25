module.exports = function (app) {
  //首页跳转
  app.get('/', function (req, res) {
    res.redirect('/posts')
  })
  // 正常路由跳转
  app.use('/signup', require('./signup'))
  app.use('/signin', require('./signin'))
  app.use('/signout', require('./signout'))
  app.use('/posts', require('./posts'))
  app.use('/comments', require('./comments'))

  // 错误页面
  // 将错误信息用页面通知展示的功能，刷新页面将会跳转到主页并显示『权限不足』的红色通知。
  app.use(function (err, req, res, next) {
    console.error(err)
    req.flash('error', err.message)
    res.redirect('/posts')
  })

  // 404 page
  app.use('/comments', require('./comments'))
  app.use(function (req, res) {
    if (!res.headersSent) {
      res.status(404).render('404')
    }
  })
}

