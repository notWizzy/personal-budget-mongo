const express = require("express");
const mongoose = require("mongoose");
const BudgetItem = require("./model/budgetItem");
const cors = require("cors");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/myBudgetDatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/budget", async (req, res) => {
  try {
    console.log("Received POST request:", req.body);
    const budgetItems = await BudgetItem.find();
    res.json({ myBudget: budgetItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/budget", async (req, res) => {
  try {
    const newItem = req.body;
    const budgetItem = new BudgetItem(newItem);
    await budgetItem.save();
    res.status(201).json(budgetItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`API served at http://localhost:${port}`);
});
