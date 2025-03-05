const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, index: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
}, { timestamps: true });

// Indexing for faster queries
CategorySchema.index({ parent: 1 });
CategorySchema.index({ status: 1 });

module.exports = mongoose.model('Category', CategorySchema);
