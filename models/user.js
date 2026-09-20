const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
       return /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\/?[a-zA-Z0-9._~:\/?%#[\]@!$&'()*+,;=-]*$/.test(v)
      },
      message: props => 'El avatar debe ser una URL válida',
    }
  }

});

module.exports = mongoose.model('user',userSchema);

/**
 * name: nombre de usuario, string de 2 a 30 caracteres, campo obligatorio.
about: información del usuario, string de 2 a 30 caracteres, campo obligatorio.
avatar: enlace al avatar, string, campo obligatorio.
 */