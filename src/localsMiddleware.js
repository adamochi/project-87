export const localsMiddleware = (req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.siteName = "Adam's project";
  if (req.session.loggedIn) {
    res.locals.user = req.session.user;
  }
  next();
};
