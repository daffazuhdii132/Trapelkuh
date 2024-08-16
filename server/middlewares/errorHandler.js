function errorHandler(err, req, res, next) {
  let status = 500;
  let message = "Internal server error";

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "SequelizeValidationError":
      status = 400;
      message = err.errors[0].message;
      break;
    case "InvalidToken":
      status = 401;
      message = "Invalid Token";
      break;
    case "NotFound":
      status = 404;
      message = "Not found";
      break;
    case "LoginInfoRequired":
      status = 400;
      message = "Email (or username) and password is required";
      break;
    case "LoginInfoIncorrect":
      status = 401;
      message = "Username or password in incorrect";
      break;
    case "Forbidden":
      status = 403;
      message = "You don't have permission";
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;

    default:
      break;
  }
  res.status(status).json({ message });
}

module.exports = errorHandler;
