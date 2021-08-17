import { ITransaction } from "./../types/transaction";
import { model, Schema } from "mongoose";

const transactionSchema: Schema = new Schema(
  {
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
  },
  { timestamps: true }
);

export default model<ITransaction>("Transaction", transactionSchema);
