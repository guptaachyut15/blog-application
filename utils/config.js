require("dotenv").config();

exports.MONGOCONNECTIONSTRING = process.env.MONGOCONNECTIONSTRING;
exports.PORT = process.env.PORT;
exports.JWTSECRET = process.env.JWTSECRET;
