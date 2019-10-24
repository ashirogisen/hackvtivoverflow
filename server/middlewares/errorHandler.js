function errorHandler(err, req, res, next) {
    console.log(err);
  
    if (err.name == "JsonWebTokenError") {
      res.status(401).json({
        message: ["Invalid token"]
      });
    } else if (err.name == "ValidationError") {
      let msgValidation = [];
      for (r in err.errors) {
        msgValidation.push(err.errors[r].message);
      }
      res.status(400).json({
        message: msgValidation
      });
    } else if (err.name == "CastError") {
      return res.status(400).send({
        message: ["Invalid ID"]
      });
    } else if (err.statusCode == 404 && err.msg === undefined) {
      res.status(404).json({
        message: ["Data not found"]
      });
    } else {
      let myErr = [err.msg];
  
      if (Array.isArray(err.msg)) {
        myErr = err.msg;
      }
      message = ''
      if (err.msg) {
        message = myErr
      } else {
        message = ["Internal server error"]
      }
      res.status(err.statusCode || 500).json({
        message
      });
    }
  }
  
  module.exports = errorHandler;