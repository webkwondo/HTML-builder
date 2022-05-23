const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');
const { stdin, stdout, exit } = process;

const file = fs.createWriteStream(path.join(__dirname, 'output.txt'));
const question = 'Hi there! What do you think? ';
const goodbye = 'Goodbye then!';

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});

const writeToFile = (fileStream, end = false, inputStr) => {
  if (end) {
    return fileStream.end();
  }

  if (inputStr) {
    inputStr += '\n';
    return fileStream.write(inputStr);
  }

  return false;
};

const ask = (q) => rl.question(q, (answer) => {
  if (answer.trim() === 'exit') {
    writeToFile(file, true);
    rl.close();
    return exit();
  }

  writeToFile(file, false, answer);
  ask(``);
});

ask(question);

process.on('exit', () => stdout.write(goodbye));
