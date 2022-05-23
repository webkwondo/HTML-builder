const { copyFile, mkdir, readdir } = require('fs/promises');
const path = require('path');

const sourceDirName = 'files';
const sourceDirPath = path.join(__dirname, sourceDirName);
const destDirName = sourceDirName + '-copy';
const destDirPath = path.join(__dirname, destDirName);

async function createDir(dirPath) {
  return await mkdir(dirPath, { recursive: true }).catch((err) => {
    if (err) throw err;
  });
}

async function readDir(dirPath) {
  return await readdir(dirPath, { withFileTypes: true });
}

async function copyDir(srcDirPath, destDirPath) {
  await createDir(destDirPath);
  const direntsArr = await readDir(srcDirPath);
  const arr = [];

  for (const entry of direntsArr) {
    const srcPath = path.join(srcDirPath, entry.name);
    const destPath = path.join(destDirPath, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      arr.push(destPath);
      await copyFile(srcPath, destPath);
    }
  }

  return arr;
}

copyDir(sourceDirPath, destDirPath)
  .then((files) => console.log(files))
  .catch((e) => console.error(e));
