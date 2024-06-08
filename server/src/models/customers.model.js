const customers = require("./customers.mongo");

async function getCustomer() {
   return await customers.findOne();
}

module.exports = {getCustomer };
