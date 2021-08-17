import { Router } from "express";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactions";

import { addUser } from "../controllers/users";

const router: Router = Router();

// for transactions
router.get("/transactions", getTransactions);

router.post("/add-transaction", addTransaction);

router.put("/edit-transaction/:id", updateTransaction);

router.delete("/delete-transaction/:id", deleteTransaction);

//for users
router.post("/add-user", addUser);

export default router;
