const fs = require('fs')
const path = require('path')
const mime = require('mime')

function getAllFilesFrom(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name)
    const stat = fs.statSync(filePath)

    if (stat.isFile()) {
      fs.readFile(filePath, function (err, data) {
        if (err) {
          throw new Error(err)
        }
        callback(filePath, data)
      })
    } else if (stat.isDirectory()) {
      getAllFilesFrom(filePath, callback)
    }
  });
}

function getMimeType(filePath) {
  return mime.getType(filePath)
}

module.exports = {
  getAllFilesFrom,
  getMimeType
};
