const crypto = require("crypto");

const mySecret = crypto.randomBytes(32).toString("hex");
console.log(mySecret);
