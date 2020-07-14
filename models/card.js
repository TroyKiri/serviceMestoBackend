const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator: (ref) => /https?:\/\/(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|([\da-z\-]+\.[a-z]+)+)(:\d{2,5}\/?)?(([\da-z]+((\/)|(#$)))+)?/.test(ref),
      message: (props) => `${props.value} is not a valid URL`,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
