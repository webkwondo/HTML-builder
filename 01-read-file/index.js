const fs = require('fs');
const path = require('path');
const process = require('process');
const { stdout } = process;

const readableSrc = fs.createReadStream(path.join(__dirname, 'text.txt'));
readableSrc.pipe(stdout);
