const users = require("./users.mongo");

async function getUser() {
   return  users.findOne();
}

module.exports = {getUser };
