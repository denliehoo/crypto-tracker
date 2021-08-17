import { Document } from "mongoose";

export interface ITransaction extends Document {
  asset: string;
  amount: number;
  price: number;
  user: any;
}
