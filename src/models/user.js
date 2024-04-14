const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password should not contain word: password");
      }
    },
  },
  role: {
    type: String,
    default: "guest",
    enum: ["guest", "superadmin"],
  },
  imageurl: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  if (!userObject.role === "superadmin") {
    delete userObject.updatedAt;
    delete userObject.__v;
  }
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "tranthanhquang", {
    expiresIn: 60 * 60,
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await User.findOne({ username, role: 'guest' });
  if (!user) throw new Error("Account does not exist!");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Incorrect password!");

  return user;
};

userSchema.statics.findSuperAdminByCredentials = async function(username, password) {
  const User = this;
  // Tìm kiếm user dựa trên username và role là superadmin
  const user = await User.findOne({ username, role: 'superadmin' });
  if (!user) {
    throw new Error('Superadmin not found');
  }
  // So sánh mật khẩu
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid password');
  }
  return user;
};


// Hash the plain text password before save
userSchema.pre("save", async function (next) {
  const user = this;
  // Tao ra mot chuoi 10 so ngau nhien bang thuat toan salt
  const salt = bcrypt.genSaltSync(10);
  if (user.isModified("password")) {
    //generate password
    user.password = bcrypt.hashSync(user.password, salt);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
