import User from "../models/User";
import bcrypt from "bcrypt";

export const profile = (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect("/login");
  }
  res.render("profile");
};
export const getJoin = (req, res) => {
  res.render("join");
};
export const postJoin = async (req, res) => {
  const { username, email, password, password2, name } = req.body;
  const pageTitle = "Create an Account";
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "passwords are not matching",
    });
  }
  const usernameExists = await User.exists({ username });
  if (usernameExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "Username already exists",
    });
  }
  const emailExists = await User.exists({ email });
  if (emailExists) {
    return res.status(400).render("join", {
      pageTitle,
      errorMessage: "This email already has an account",
    });
  }
  try {
    await User.create({ username, email, password, name });
    res.status(201).redirect(`/login`);
  } catch (error) {
    res.status(404).render("404", { pageTitle: error });
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};
export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", {
        errorMessage: "username was not recognised, please try again",
      });
    }
    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.render("login", {
        pageTitle: "Login",
        errorMessage: "Password doesn't match this username",
      });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    res.redirect(`/user/profile`);
  } catch (error) {
    res.render("404", { pageTitle: error._message });
  }
};
