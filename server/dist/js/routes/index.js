"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactions_1 = require("../controllers/transactions");
const users_1 = require("../controllers/users");
const router = express_1.Router();
// for transactions
router.get("/transactions", transactions_1.getTransactions);
router.post("/add-transaction", transactions_1.addTransaction);
router.put("/edit-transaction/:id", transactions_1.updateTransaction);
router.delete("/delete-transaction/:id", transactions_1.deleteTransaction);
//for users
router.post("/add-user", users_1.addUser);
exports.default = router;
