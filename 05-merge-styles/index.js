const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

const sourceDirName = 'styles';
const sourceDirPath = path.join(__dirname, sourceDirName);
const destDirName = 'project-dist';
const destDirPath = path.join(__dirname, destDirName);
const extention = '.css';
const outputFileName = 'bundle.css';
const outputFilePath = path.join(destDirPath, outputFileName);

async function mergeFiles(srcDirPath, destPath) {
  const writableFileStream = fs.createWriteStream(destPath);
  const dirents = await readdir(srcDirPath, { withFileTypes: true });

  for (let entry of dirents) {
    const srcPath = path.join(srcDirPath, entry.name);
    const { ext } = path.parse(srcPath);

    if (entry.isDirectory() || ext !== extention) {
      continue;
    }

    const readableFileStream = fs.createReadStream(srcPath);
    readableFileStream.setEncoding('utf8');

    for await (const chunk of readableFileStream) {
      writableFileStream.write(chunk);
    }
  }

  writableFileStream.end();
}

mergeFiles(sourceDirPath, outputFilePath)
  .then(() => console.log('Merged!'))
  .catch((e) => console.error(e));
