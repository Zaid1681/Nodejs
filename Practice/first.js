const { readFileSync, readFile } = require("fs");
const os = require("os");

// console.log(os.cpus().length);

//example o blocking operation
// line by line excution -- synchronous appproach goes inside the threadpool
// console.log("1");
// const res = readFileSync("./firstfile.txt", "utf-8");
// console.log(res);
// console.log("2");

// Aysnchronous Non-blocking Operation

console.log("1");
readFile("./firstfile.txt", "utf-8", (err, data) => {
  console.log(data);
});
console.log("2");
console.log("3");
