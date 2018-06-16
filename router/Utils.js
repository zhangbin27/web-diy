const MongoClient = require('mongodb').MongoClient

var uri = 'mongodb://frank:GdvceR9k02mz6Mim@cluster0-shard-00-00-iew37.mongodb.net:27017,cluster0-shard-00-01-iew37.mongodb.net:27017' +
  ',cluster0-shard-00-02-iew37.mongodb.net:27017/web-diy?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const dbName = 'web-diy'

module.exports = {
  connect () {
    return new Promise((resolve) => {
      if (global._dbo && global._db) {
        resolve({db: global._db, dbo: global._dbo})
      }
      MongoClient.connect(uri, (err, db) => {
        if (err) throw err
        var dbo = db.db(dbName)
        global._db = db
        global._dbo = dbo
        resolve({db, dbo})
      })
    })
  }
}
