const fs = require('fs');
const path = require('path');

function isValidExtension(file) {
    return ['.txt', '.json', '.rtf'].includes(path.extname(file));
}

function writeFile(filePath, data) {
    fs.writeFileSync(filePath, data, 'utf8');
}

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

function overwriteFile(filePath, data) {
    fs.writeFileSync(filePath, data, 'utf8');
}

function clearFile(filePath) {
    fs.writeFileSync(filePath, '', 'utf8');
}

function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\d+/g, '');
    content = content.toLowerCase();
    fs.writeFileSync(filePath, content, 'utf8');
}

function copyFile(srcPath, destPath) {
    fs.copyFileSync(srcPath, destPath);
}

function createFolder(folderPath) {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }
}

function deleteFolder(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
    }
}

function getAllFiles(dirPath, arrayOfFiles = []) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        if (file === 'node_modules' || file === '.git') return;

        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
        } else {
            if (isValidExtension(file)) {
                arrayOfFiles.push(fullPath);
            }
        }
    });

    return arrayOfFiles;
}

function clearProject(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        if (file === 'node_modules' || file === '.git') return;

        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            fs.rmSync(fullPath, { recursive: true, force: true });
        } else {
            fs.unlinkSync(fullPath);
        }
    });
}

module.exports = {
    writeFile,
    readFile,
    overwriteFile,
    clearFile,
    cleanFile,
    copyFile,
    createFolder,
    deleteFolder,
    getAllFiles,
    clearProject,
};
