const reader = require('./util/csv_reader')
const push_root = require('./util/push_root')
const push_report = require('./util/push_report')
//
// db.ref()
//   .set({
//     rating_details: { total_rating: 4, number_of_ratings: 1, agent_assigned: "AG001", history: {"201910": {total_rating: 2, number_of_ratings: 1}}, }
//   })
//
// rating_details
// feedbacks
//



// push_root('agent', 'agent', db)
// push_root('reward', 'rewards', db)
// reward_detail
//
// user.points
// user.claimed
// user.reports


reader("user")
  .then(data => push_root('user', data))
  .then(() => reader("agent").then(data => push_root('agent', data)))
  .then(() => reader("reward").then(data => push_root('reward', data)))
  .then(() => reader("report").then(data => push_report(data)))
