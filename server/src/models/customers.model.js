const customers = require("./customers.mongo");

async function seedCustomers() {
  let seedingCustomers = [
    { nickName: "Sergio", role: "user" },
    { nickName: "Sang Chi", role: "admin" },
  ];
  seedingCustomers.forEach(async (seedingCustomer) => {
    await customers.updateOne(
      { nickName: seedingCustomer.nickName },
      { seedingCustomer },
      {
        upsert: true,
      }
    );
  });
}

async function loadCustomersFromSeed() {
  const firstCustomer = await customers.findOne();
  if (firstCustomer) {
    console.log("Customer data already loaded");
  } else {
    await seedCustomers();
  }
}

async function getCustomer() {
   return await customers.findOne();
}

module.exports = { loadCustomersFromSeed, getCustomer };
