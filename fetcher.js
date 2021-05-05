const url = process.argv[2];
const path = process.argv[3];

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const request = require('request'); 
const fs = require('fs');

request(url, (err, response, body) => {

  if (err) {
    console.log('Please enter a valid URL');
    process.exit();
  }

  fs.access(path, (err) => {
    if (err) {
      console.log('Path does not exist or you do not have access permission');
      process.exit();
    }
  })

  if (fs.existsSync(path)) {
    console.log('File already exists');
    readline.question('Do you want to override the file (Y)? ', answer => {
      if (answer !== 'y') process.exit();
      if (!err) {console.log(`Downloaded and saved ${body.length} bytes to ./index.html`)};
      process.exit();
    });
  } else { fs.writeFile(path, body, (err) => {
    if (!err) {console.log(`Downloaded and saved ${body.length} bytes to ./index.html`)};
    process.exit();
    });
  };
});
