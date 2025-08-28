import argon2 from "argon2";

// password you want to hash
const password = "Param@290803";

// generate salt and hash
const saltRounds = 10;
const hashedPassword = await argon2.hash(password, saltRounds);

console.log("Hashed Password:", hashedPassword);