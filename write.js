const fs = require("fs");
const { exec } = require("child_process");

// const content = "aaaaaaaaaaaaaaaaa Some content me!";

// // fs.writeFile("./demo.txt", content, (err) => {
// //   if (err) {
// //     console.log(err);
// //   }
// //   console.log("Command output has been stored in demo.txt");
// // });

// fs.appendFile("./demo.txt", content, (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Command output has been stored in demo.txt");
// });
const command = "ls";
exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error executing the command: ${error.message}`);
    return;
  }
  fs.writeFile("demo.txt", stdout, (err) => {
    if (err) {
      console.error(`Error writing to file: ${err.message}`);
      return;
    }
    console.log("Command output has been stored in output.txt");
  });
});
