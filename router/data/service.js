const dao = require('./dao')

module.exports = {
  async getDataList (pid, query = {}) {
    var res = await dao.getDataList(pid)
    res = res.filter(row => Object.keys(query).every(field => {
      var param = query[field]
      var value = row[field]
      if (Array.isArray(param)) {
        value = Date.parse(row[field])
        var [start = -Infinity, end = Infinity] = param
        return value > Date.parse(start) && value < Date.parse(end)
      } else {
        return value === param || !param
      }
    }))
    return res
  },
  async deleteData (row) {
    var res = await dao.deleteData(row.rid)
    return res
  },
  async getDataDetail (row) {
    var res = await dao.getDataDetail(row.rid)
    return res
  },
  async editData (row) {
    var target = await dao.getDataDetail(row.rid)
    var res = false
    if (target) {
      res = await dao.editData(row)
    } else {
      res = await dao.addData(row)
    }
    return res
  }
}
