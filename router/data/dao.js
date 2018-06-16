const Utils = require('../Utils')

module.exports = {
  getDataList (pid) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').find({pid}).toArray((err, rows) => {
          if (err) throw err
          resolve(rows)
        })
      })
    })
  },
  deleteData (rid) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').deleteOne({rid}, (err) => {
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  getDataDetail (rid) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').find({rid}).limit(1).toArray((err, rows) => {
          if (err) throw err
          resolve(rows[0])
        })
      })
    })
  },
  addData (row) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').insertOne(row, (err) => {
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  editData (row) {
    delete row['_id']
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').updateOne({rid: row.rid}, {$set: row}, (err) => {
          if (err) throw err
          resolve(true)
        })
      })
    })
  }
}
