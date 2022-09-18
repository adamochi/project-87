import Recipe from "../models/Recipe";

export const trending = async (req, res) => {
  let recipes = [];
  try {
    recipes = await Recipe.find({});
    res.render("trending", { recipes });
  } catch (error) {
    console.log("Error:", error);
  }
};

export const postRecipe = async (req, res) => {
  const { title, description, method } = req.body;
  try {
    await Recipe.create({ title, description, method });
    return res.redirect("/recipes");
  } catch (error) {
    console.log(error);
  }
};

export const getUploadRecipe = (req, res) => {
  res.render("recipe");
};

export const postUploadRecipe = async (req, res) => {
  const { title, description, method } = req.body;
  try {
    await Recipe.create({ title, description, method });
    return res.redirect("/recipes");
  } catch (error) {
    console.log(error);
  }
};
