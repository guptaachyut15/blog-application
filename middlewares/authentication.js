const { validateToken } = require("../utils/authentication");

exports.checkForAuthenticationCookie = (cookieName) => {
  return (req, res, next) => {
    const cookieToken = req.cookies?.[cookieName];
    if (!cookieToken) {
      return next();
    }
    try {
      const user = validateToken(cookieToken);
      req.user = user;
    } catch (err) {
      console.log(err);
    }
    next();
  };
};
