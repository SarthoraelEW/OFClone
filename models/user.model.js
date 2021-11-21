const mongoose = require("mongoose");
const { isEmail, isMobilePhone } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 55,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      unique: true,
      trim: true,
    },
    verifyEmail: {
      type: {
        isVerified: Boolean,
        token: String
      },
      default: {
        isVerified: true,
        token: ""
      }
    },
    password: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      maxlength: 40,
      trim: true
    },
    bio: {
      type: String,
      maxlength: 1000,
      trim: true,
      default: ""
    },
    profilePicture: {
      type: String,
      default: "./uploads/profil/random-user.png"
    },
    bannery: {
      type: String,
      default: "./uploads/profil/random-user-bannery.png"
    },
    phoneNumber: {
      type: {
        phoneNumber: String,
        isVerified: Boolean,
        verificationCode: String
      },
      default: {phoneNumber: "", isVerified: false, verificationCode: ""}
    },
    location: {
      type: String,
      maxlength: 64,
      default: ""
    },
    website: {
      type: String,
      trim: true,
      default: ""
    },
    wishlist: {
      type: String,
      trim: true,
      default: ""
    },
    price: {
      type: String,
      default: "0 €"
    },
    cards: {
      type: [
        {
          country: String,
          state: String,
          street: String,
          city: String,
          zip: String,
          cardName: String,
          cardNumber: String,
          expiration: String,
          cvc: String,
        },
      ],
    },
    payements: {
      type: [
        {
          date: Date,
          amout: String,
          description: String,
          isSucceeded: Boolean,
        },
      ],
    },
    fans: {
      type: [String],
    },
    followings: {
      type: [String],
    },
    subscriptions: {
      type: [
        {
          creatorId: String,
          isActive: Boolean,
          subTime: Number,
          date: Date,
        },
      ],
    },
    posts: {
      type: [String],
    },
    medias: {
      type: [String],
    },
    conversations: {
      type: [
        {
          userId: String,
          messages: [String],
        },
      ],
    },
    notifications: {
      type: [
        {
          userId: String,
          description: String,
          date: String,
          read: Boolean
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

// play function before save into display: 'block',
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
