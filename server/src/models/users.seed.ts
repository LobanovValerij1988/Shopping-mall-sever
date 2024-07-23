const users = require("./users.mongo");
const {hash} = require("bcrypt");

async function seedUsers() {
  let seedingUsers = [
    { nickName: "Sergio", roles: ["customer"], activeStatus: true, password: hash( "some kind") },
    { nickName: "Sang Chin", roles: ["admin"], activeStatus: false, password: hash("password") },
  ];
  seedingUsers.forEach(async (seedingUser) => {
    await users.create(seedingUser);
    });
}

async function loadUserFromSeed() {
  const firstUser = await users.findOne();
  if (firstUser) {
    console.log("User data already loaded");
  } else {
    await seedUsers();
  }
}

module.exports= {
  loadUserFromSeed
}