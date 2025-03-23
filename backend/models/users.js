const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      length: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      length: 50,
    },
    password: {
      type: String,
      required: true,
      length: 50,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "editor", "reader"],
      default: "reader",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(user.password, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          user.password = hash;
          return next();
        });
      }
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      return callback(null, isMatch);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
