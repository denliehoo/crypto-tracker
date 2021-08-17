import { Response, Request } from "express";
import { ITransaction } from "../../types/transaction";
import Transaction from "../../models/transaction";

// getting the transctions (all of it)
// maybe do a get request with a paylod of the ID of the user
const getTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions: ITransaction[] = await Transaction.find();
    res.status(200).json({ transactions });
  } catch (err) {
    throw err;
  }
};

// creating the transaction
const addTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<
      ITransaction,
      "asset" | "amount" | "price" | "user"
    >;

    const transaction: ITransaction = new Transaction({
      asset: body.asset,
      amount: body.amount,
      price: body.price,
      user: body.user,
    });
    const newTransaction: ITransaction = await transaction.save();
    const allTransactions: ITransaction[] = await Transaction.find();

    res.status(201).json({
      message: "Transaction added",
      transaction: newTransaction,
      transactions: allTransactions,
    });
  } catch (err) {
    throw err;
  }
};

// updates the transaction
// we extract the id and the body from the req object, then pass it through findByIdAndUpdate
const updateTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      params: { id },
      body,
    } = req;
    const updateTransaction: ITransaction | null =
      await Transaction.findByIdAndUpdate({ _id: id }, body);
    const allTransactions: ITransaction[] = await Transaction.find();
    res.status(200).json({
      message: "Transaction updated",
      transaction: updateTransaction,
      transactions: allTransactions,
    });
  } catch (error) {
    throw error;
  }
};

//deletes the transaction
const deleteTransaction = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const deleteTransaction: ITransaction | null =
      await Transaction.findByIdAndRemove(req.params.id);
    const allTransactions: ITransaction[] = await Transaction.find();
    res.status(200).json({
      message: "Transaction deleted",
      transaction: deleteTransaction,
      transactions: allTransactions,
    });
  } catch (error) {
    throw error;
  }
};

export {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
