const reader = require('./csv_reader')
const { db } = require('./db')

module.exports = async (section, data) => {
  data.map(val => {
    const key = val.id
    delete val.id
    db.ref(section).child(key).set(val)
  })
}
