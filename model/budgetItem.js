const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
    match: /^#[0-9A-Fa-f]{6}$/, // 6-digit hexadecimal regex
  },
});

const BudgetItem = mongoose.model("BudgetItem", budgetSchema);

module.exports = BudgetItem;
