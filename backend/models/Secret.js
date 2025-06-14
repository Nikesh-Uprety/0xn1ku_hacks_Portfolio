
const mongoose = require('mongoose');

const secretSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  classification: {
    type: String,
    enum: ['TOP SECRET', 'SECRET', 'CONFIDENTIAL', 'RESTRICTED'],
    default: 'SECRET'
  },
  accessLevel: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  encrypted: {
    type: Boolean,
    default: true
  },
  published: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

secretSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Secret', secretSchema);
