"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    asset: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    user: {
        // type: Schema.Types.ObjectId,
        // ref: "User",
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.model("Transaction", transactionSchema);
