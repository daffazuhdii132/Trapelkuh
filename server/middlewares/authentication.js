const { verifyToken } = require("../helpers");
const { User } = require("../models");

async function authentication(req, res, next){
    let access_token = req.headers.authorization;
  try {

    if (!access_token){
        // console.log("gaada token");
        throw {name: "InvalidToken"}
    }

    let [bearer, token] = access_token.split(" ");

    if (bearer !== "Bearer"){
        throw { name: "InvalidToken" }
    }

    let payload = verifyToken(token);

    let user = await User.findByPk(payload.id);
    if (!user) {
        throw { name: "InvalidToken" }
    }

    req.user = {
      id: user.id,
      role: user.role
    };

    next();
  } catch (error) {
    // console.log(error);
    next(error)
    
  }
}
module.exports = authentication
