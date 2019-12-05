// 连接数据库
// 存储信息
const config = require('config-lite')(__dirname)
const Mongolass = require('mongolass')
const mongolass = new Mongolass()

mongolass.connect(config.mongodb)

// 登录 使用了 addCreatedAt 自定义插件（通过 _id 生成时间戳）
const moment = require('moment')
const objectIdToTimestamp = require('objectid-to-timestamp')

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
  afterFind: function (results) {
    results.forEach(function (item) {
      item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm')
    })
    return results
  },

  afterFindOne: function (result) {
    if (result) {
      result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm')
    }
    return result
  }
})

// 只存储用户的名称、密码（加密后的）、头像、性别和个人简介这几个字段
// 定义了用户表的 schema，生成并导出了 User 这个 model，同时设置了 name 的唯一索引，保证用户名是不重复的
// Mongolass 中的 model 你可以认为相当于 mongodb 中的 collection，只不过添加了插件的功能。
// required: true 表示该字段是必需的，default: xxx 用于创建文档时设置默认值。API https://github.com/nswbmw/another-json-schema
exports.User = mongolass.model('User', {
  name: { type: 'string', required: true },
  password: { type: 'string', required: true },
  avatar: { type: 'string', required: true },
  // gender: { type: 'string', enum: ['m', 'f', 'x'], default: 'x' },
  bio: { type: 'string', required: true },
  user_url: {type: 'string'},
  // repos: [{type: 'object'}],
  description: {type: 'string'}
})
exports.User.index({ name: 1 }, { unique: true }).exec()// 根据用户名找到用户，用户名全局唯一

//只存储文章的作者 id、标题、正文和点击量这几个字段
exports.Post = mongolass.model('Post', {
  author: { type: Mongolass.Types.ObjectId, required: true },
  title: { type: 'string', required: true },
  content: { type: 'string', required: true },
  pv: { type: 'number', default: 0 }, //点击量
  favourite: [{ type: 'string'}], // 点赞用户集
  favourite_count: {type: 'number'} // 点赞总量
})
exports.Post.index({ author: 1, _id: -1 }).exec()// 按创建时间降序查看用户的文章列表

//留言的作者 id、留言内容和关联的文章 id 这几个字段
exports.Comment = mongolass.model('Comment', {
  author: { type: Mongolass.Types.ObjectId, required: true },
  content: { type: 'string', required: true },
  postId: { type: Mongolass.Types.ObjectId, required: true }
})
exports.Comment.index({ postId: 1, _id: 1 }).exec()// 通过文章 id 获取该文章下所有留言，按留言创建时间升序
exports.Comment.index({ author: 1, _id: 1 }).exec();// 通过用户 id 和留言 id 删除一个留言

// //收藏者的id，关联文章
// exports.Collect = mongolass.model('Collect', {
//   author: { type: Mongolass.Types.ObjectId, required: true },
//   postId: { type: Mongolass.Types.ObjectId, required: true }
// })

// 文章收藏模块
exports.Collects = mongolass.model('Collects',{
  author: {type: Mongolass.Types.ObjectId},
  collections: [{type: "string"}]
});

exports.Collects.index({author: 1}).exec(); // 用户名唯一