import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  method: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const Recipe = mongoose.model("recipe", recipeSchema);
export default Recipe;
