const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nhập tên của bạn"],
    maxLength: [50, "Tối đa 50 ký tự"],
  },
  email: {
    type: String,
    required: [true, "Hãy nhập email"],
    unique: true,
    validate: [validator.isEmail, "Hãy nhập đúng email"],
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu"],
    minLength: [6, "Nhập ít nhất 6 ký tự"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      require: true,
    },
    url: {
      type: String,
      require: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = bcrypt.hash(this.password, 10);
});

// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("user", userSchema);
