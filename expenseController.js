const Expense = require('../models/expense'); // Adjust the path if necessary

// Create a new expense
exports.createExpense = async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('participants');
    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get an expense by ID
exports.getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate('participants');
    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });
    } else {
      res.status(200).send(expense);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) {
      res.status(404).send({ message: 'Expense not found' });
    } else {
      res.status(200).send(expense);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndRemove(req.params.id);
    res.status(200).send({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};