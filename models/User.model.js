const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  avatar: {
    type: String,
    default: 'https://img2.freepng.es/20180407/kce/kisspng-computer-icons-avatar-user-profile-contact-5ac87865a18d00.9369584415230874616617.jpg',
    set: value => value === '' ? 'https://img2.freepng.es/20180407/kce/kisspng-computer-icons-avatar-user-profile-contact-5ac87865a18d00.9369584415230874616617.jpg' : value
  },

},
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User