import mongoose,{ Schema, Model, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  username: string;
  image?: string;
  role: "user" | "admin";
}
const userSchema = new Schema<IUser>({
  email:{
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  username:{
    type: String,
    required: [true, "Username is required"],
  },
  image:{
    type: String,
  },
  role:{
    type: String,
    default: "user",
  },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
