import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 5);
}); // in this context: inside this function the word "this" refers to the user that is being created.

const User = mongoose.model("user", userSchema);
export default User;
