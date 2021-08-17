import { Response, Request } from "express";
import { IUser } from "../../types/users";
import User from "../../models/users";

// gets the user

const addUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = req.body as Pick<IUser, "email" | "password">;

    const user: IUser = new User({
      email: body.email,
      password: body.password,
    });
    const registeredUser: IUser = await user.save();

    res.status(201).json({
      message: "User registered",
      user: registeredUser,
    });
  } catch (err) {
    throw err;
  }
};

export { addUser };
