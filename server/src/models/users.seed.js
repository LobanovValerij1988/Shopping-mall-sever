const users = require("./users.mongo");

async function seedUsers() {
  let seedingUsers = [
    { nickName: "Sergio", role: "user" },
    { nickName: "Sang Chi", role: "admin" },
  ];
  seedingUsers.forEach(async (seedingUser) => {
    await users.updateOne(
      { nickName: seedingUser.nickName },
      { seedingUser },
      {
        upsert: true,
      }
    );
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