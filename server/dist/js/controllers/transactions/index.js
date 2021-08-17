"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTransaction = exports.updateTransaction = exports.addTransaction = exports.getTransactions = void 0;
const transaction_1 = __importDefault(require("../../models/transaction"));
// getting the transctions (all of it)
// maybe do a get request with a paylod of the ID of the user
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transactions = yield transaction_1.default.find();
        res.status(200).json({ transactions });
    }
    catch (err) {
        throw err;
    }
});
exports.getTransactions = getTransactions;
// creating the transaction
const addTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const transaction = new transaction_1.default({
            asset: body.asset,
            amount: body.amount,
            price: body.price,
            user: body.user,
        });
        const newTransaction = yield transaction.save();
        const allTransactions = yield transaction_1.default.find();
        res.status(201).json({
            message: "Transaction added",
            transaction: newTransaction,
            transactions: allTransactions,
        });
    }
    catch (err) {
        throw err;
    }
});
exports.addTransaction = addTransaction;
// updates the transaction
// we extract the id and the body from the req object, then pass it through findByIdAndUpdate
const updateTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { params: { id }, body, } = req;
        const updateTransaction = yield transaction_1.default.findByIdAndUpdate({ _id: id }, body);
        const allTransactions = yield transaction_1.default.find();
        res.status(200).json({
            message: "Transaction updated",
            transaction: updateTransaction,
            transactions: allTransactions,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.updateTransaction = updateTransaction;
//deletes the transaction
const deleteTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteTransaction = yield transaction_1.default.findByIdAndRemove(req.params.id);
        const allTransactions = yield transaction_1.default.find();
        res.status(200).json({
            message: "Transaction deleted",
            transaction: deleteTransaction,
            transactions: allTransactions,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.deleteTransaction = deleteTransaction;
