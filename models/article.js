const mongoose = require('mongoose');

const url = /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\/?[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*$/;

const articleSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  keyword: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },

  source: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return url.test(value);
      },
    },
  },

  image: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return url.test(value);
      },
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('article', articleSchema);