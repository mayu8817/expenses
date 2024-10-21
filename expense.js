const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  splitMethod: { type: String, enum: ['equal', 'exact', 'percentage'], required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User ' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Expense', expenseSchema);