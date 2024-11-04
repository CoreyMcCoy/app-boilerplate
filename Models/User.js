const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: false,
    },

    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
      default: 'user',
    },

    accountType: {
      type: String,
      enum: ['trial', 'active', 'lifetime'],
      required: true,
      default: 'trial',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
