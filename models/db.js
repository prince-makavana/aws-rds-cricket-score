const db = {}

db.user = require('./user')
db.score = require('./score')

db.score.belongsTo(db.user)

module.exports = db