const uuid = require('uuid')
const moment = require('moment')
const { db, storage } = require('./db')
// const image2base64 = require('image-to-base64');

const update_rating = (rating, val) => {
  rating = rating ? rating : {}
  return {
    total: rating.total ? rating.total += val.rating : val.rating,
    number_of_rating: rating.number_of_rating ? rating.number_of_rating += 1 : 1,
  }
}

const update_history = (history, id, val) => {
  const key = moment().format('YYYY_MM_DD')
  history = history ? history : {}

  if (history[key]) {
    history[key].report.push(id)
    history[key].rating = update_rating(history[key].rating, val)
  } else {
    history[key] = {
      report: [id],
      rating: update_rating({}, val)
    }
  }

  return history
}

module.exports = async (data) => {
  data.map(async val => {
    const id = uuid()
    await db.ref("feedback").child(id).set(val)
    await db.ref("location_detail")
      .child(val.location.replace(/\s/g, '_'))
      .transaction(x => {
        x = x ? x : {}
        x.rating = update_rating(x.rating, val)
        x.history = update_history(x.history, id, val)
        return x
      })
    await db.ref("user")
      .child(val.user)
      .child('feedbacks')
      .transaction(x => x ? x.concat(id): [id])
  })
}
