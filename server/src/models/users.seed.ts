import {users} from "./users.mongo";
import bcrypt from 'bcrypt';

export async function seedUsers() {
  let seedingUsers = [
    { nickName: "Sergio", roles: ["customer"], activeStatus: true, password: bcrypt.hash( "some kind",10) },
    { nickName: "Sang Chin", roles: ["admin"], activeStatus: false, password: bcrypt.hash("password",10) },
  ];
  for (const seedingUser of seedingUsers) {
    await users.create(seedingUser);
    }
}

export async function loadUserFromSeed() {
  const firstUser = await users.findOne();
  if (firstUser) {
    console.log("User data already loaded");
  } else {
    await seedUsers();
  }
}