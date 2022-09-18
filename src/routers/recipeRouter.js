import express from "express";
import {
  getUploadRecipe,
  postUploadRecipe,
  trending,
} from "../controllers/recipeController";

const recipeRouter = express.Router();

recipeRouter.get("/", trending);
recipeRouter
  .route("/upload-recipe")
  .get(getUploadRecipe)
  .post(postUploadRecipe);

export default recipeRouter;
