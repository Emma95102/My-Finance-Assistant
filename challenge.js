const mongoose = require('mongoose');

const ChallengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: String,
  startDate: Date,
  endDate: Date,
  participants: [{
    userId: String,
    username: String,
    checkins: [Date]
  }]
});

module.exports = mongoose.model('Challenge', ChallengeSchema);
