var cache = require('./cache')
var express = require('express')
var fs = require('fs')

var router = express.Router()

function flush () {
  // 把js对象转成json，写入文件中
  fs.writeFileSync('./router/mock.json', JSON.stringify(cache))
}

router.post('/page/list', function (req, res) {
  console.log('page/list', req.body, req.url)
  var {page, pageNum: num, pageSize: size, searchData} = req.body
  var data = cache.data[page].filter(row => Object.keys(searchData).every(field => {
    var param = searchData[field]
    var value = row[field]
    if (Array.isArray(param)) {
      value = Date.parse(row[field])
      var [start = -Infinity, end = Infinity] = param
      return value > Date.parse(start) && value < Date.parse(end)
    } else {
      return value === param || !param
    }
  }))
  res.json({
    total_num: data.length,
    detail: data.slice(num * (size - 1), size)
  })
})
router.post('/page/delete', function (req, res) {
  var {page, row} = req.body
  var list = cache.data[page]
  cache.data[page] = list.filter(item => item._key !== row._key)
  flush()
  res.json({re: 200})
})
router.post('/page/detail', function (req, res) {
  var {page, row} = req.body
  var target = cache.data[page].find(item => item._key === row._key)
  res.json({data: target || {}})
})
router.post('/page/edit', function (req, res) {
  var {page, params} = req.body
  var list = cache.data[page]
  var target = list.find(item => item._key === params._key)
  if (target) {
    Object.assign(target, params)
  } else {
    list.unshift(params)
  }
  flush()
  res.json({re: 200})
})
router.post('/config/set', function (req, res) {
  var params = req.body
  var target = cache['pages'].find(item => item._key === params._key)
  if (!target) {
    cache['pages'].push({
      _key: params._key,
      name: params.name,
      listUrl: params.listUrl,
      deleteUrl: params.deleteUrl,
      detailUrl: params.detailUrl,
      editUrl: params.editUrl
    })
    cache.data[params._key] = []
  } else {
    Object.assign(target, {
      _key: params._key,
      name: params.name,
      listUrl: params.listUrl,
      detailUrl: params.detailUrl,
      deleteUrl: params.deleteUrl,
      editUrl: params.editUrl
    })
  }
  cache.form[params._key] = params.formItemList
  flush()
  res.json({re: 200})
})
router.post('/config/list', function (req, res) {
  res.json({re: 200, data: cache['pages']})
})
router.post('/config/get', function (req, res) {
  var {page: key} = req.body
  console.log('xxx', req.body)
  var target = cache.pages.find(item => item._key === key) || {}
  var formItemList = cache.form[target._key]
  res.json({
    re: '200',
    data: {
      name: target.name,
      page: target._key,
      _key: target._key,
      editUrl: target.editUrl,
      deleteUrl: target.deleteUrl,
      detailUrl: target.detailUrl,
      listUrl: target.listUrl,
      formItemList: formItemList
    }
  })
})
module.exports = router
