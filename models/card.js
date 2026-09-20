/**name: nombre de la tarjeta, string de 2 a 30 caracteres, campo obligatorio.
link: enlace a la imagen, string, campo obligatorio. Utiliza la expresión regular del esquema user para validar los datos de entrada.
owner: enlace al modelo del autor de la tarjeta, tipo ObjectId, campo obligatorio.
likes: una lista de usuarios que dieron like a la publicación, un array ObjectId, un array vacío por defecto (default field)
createdAt: fecha de creación, tipo Date, valor por defecto Date.now
*/

const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
         return /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\/?[a-zA-Z0-9._~:\/?%#[\]@!$&'()*+,;=-]*$/.test(v)
      },
      message: props => 'link debe ser una URL válida',
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes:[
    { type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [] }
    ],
    createdAt:{
      type:Date,
      default:Date.now
    }
});

module.exports = mongoose.model('card',cardSchema);