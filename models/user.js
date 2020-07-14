const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator: (ref) => /https?:\/\/(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|([\da-z\-]+\.[a-z]+)+)(:\d{2,5}\/?)?(([\da-z]+((\/)|(#$)))+)?/.test(ref),
      message: (props) => `${props.value} is not a valid URL`,
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
