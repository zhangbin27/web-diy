var dao = require('./dao')
var userDao = require('../user/dao')

module.exports = {
  async getConfig (token) {
    var user = await userDao.getUserByToken(token)
    var res = await dao.getConfig(user.uid)
    return res
  },
  async setConfig (token, row) {
    // var target = cache['pages'].find(item => item._key === params._key)
    var user = await userDao.getUserByToken(token)
    var target = await dao.getConfig(user.uid)
    var res = false
    if (!target) {
      row.uid = user.uid
      res = await dao.addConfig(row)
    } else {
      res = await dao.editConfig(user.uid, row)
    }
    return res
  }
}
