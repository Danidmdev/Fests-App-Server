const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [4, 'Minimum length of the password must be 4']
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

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

userSchema.methods.signToken = function () {
  const { _id, username, email, role, avatar } = this
  const payload = { _id, username, email, role, avatar }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}

userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}

const User = model("User", userSchema)

module.exports = User