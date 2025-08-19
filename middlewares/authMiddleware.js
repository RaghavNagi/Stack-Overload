const passport = require("passport");
console.log("Auth middleware triggered");
const protect = passport.authenticate("jwt", { session: false });
module.exports = { protect };
