import { IUser } from "./../types/users";
import { model, Schema } from "mongoose";
// import passportLocalMongoose from "passport-local-mongoose";

const usersSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// usersSchema.plugin(passportLocalMongoose);

export default model<IUser>("User", usersSchema);
