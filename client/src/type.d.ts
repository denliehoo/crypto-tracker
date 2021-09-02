interface ITransaction {
  _id: string;
  asset: string;
  amount: number;
  price: number;
  user: any;
  createdAt?: string;
  updatedAt?: string;
}
interface IUser {
  email: string;
  password: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TransactionProps {
  transaction: ITransaction;
}

//   status as in 200 404 etc
type ApiDataType = {
  message: string;
  status: string;
  transactions: ITransaction[];
  transaction?: ITransaction;
};

type ApiUserDataType = {
  message: string;
  status: string;
  users: IUser[];
  user?: IUser;
};

//might delete later
// declare module "react-tradingview-widget";
