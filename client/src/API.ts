import axios, { AxiosResponse } from "axios";

const baseUrl: string = "http://localhost:4000";

export const getTransactions = async (): Promise<
  AxiosResponse<ApiDataType>
> => {
  try {
    const transactions: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl + "/transactions"
    );
    return transactions;
  } catch (error) {
    throw new Error(error);
  }
};

export const addTransaction = async (
  formData: ITransaction
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const transaction: Omit<ITransaction, "_id"> = {
      asset: formData.asset,
      price: formData.price,
      amount: formData.amount,
      user: formData.user,
    };
    const saveTransaction: AxiosResponse<ApiDataType> = await axios.post(
      baseUrl + "/add-transaction",
      transaction
    );
    return saveTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTransaction = async (
  id: String,
  formData: ITransaction
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const transactionUpdate: Omit<ITransaction, "_id"> = {
      asset: formData.asset,
      price: formData.price,
      amount: formData.amount,
      user: formData.user,
    };
    const updatedTransaction: AxiosResponse<ApiDataType> = await axios.put(
      `${baseUrl}/edit-transaction/${id}`,
      transactionUpdate
    );
    return updatedTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteTransaction = async (
  _id: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const deletedTransaction: AxiosResponse<ApiDataType> = await axios.delete(
      `${baseUrl}/delete-transaction/${_id}`
    );
    return deletedTransaction;
  } catch (error) {
    throw new Error(error);
  }
};

// for users
// export const addUser = async (
//   formData: IUser
// ): Promise<AxiosResponse<ApiUserDataType>> => {
//   try {
//     const user: Omit<IUser, "_id"> = {
//       email: formData.email,
//       password: formData.password,
//     };
//     const registeredUser: AxiosResponse<ApiUserDataType> = await axios.post(
//       baseUrl + "/add-user",
//       user
//     );
//     return registeredUser;
//   } catch (error) {
//     throw new Error(error);
//   }
// };
