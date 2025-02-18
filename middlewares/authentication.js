const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookies(cookieName){
  return (req,res, next) => {
    const tokenCookieVaule = req.cookies[cookieName];
    if(!tokenCookieVaule){
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieVaule);
      req.user = userPayload;
    } catch (error) {}

    return next()
  };
}

module.exports = {
  checkForAuthenticationCookies,
}