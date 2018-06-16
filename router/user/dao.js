const Utils = require('../Utils')

module.exports = {
  addUser (row) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('user').insertOne(row, (err) => {
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  getUser (uid) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('user').find({uid}).limit(1).toArray((err, rows) => {
          if (err) throw err
          resolve(rows[0])
        })
      })
    })
  },
  getUserByToken (token) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('user').find({token}).limit(1).toArray((err, rows) => {
          if (err) throw err
          resolve(rows[0])
        })
      })
    })
  },
  editUser (row) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('user').updateOne({uid: row.uid}, {$set: row}, (err) => {
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  editUserByToken (token, row) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('user').updateOne({token}, {$set: row}, (err) => {
          if (err) throw err
          resolve(true)
        })
      })
    })
  }
}
