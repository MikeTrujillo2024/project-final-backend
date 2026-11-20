const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  email: {
    type: String,
    validate: {
      validator(value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: 'El correo electrónico no tiene un formato válido',
    },
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('user', userSchema);
