require('dotenv').config({ path: '../.env' });
const os = require('os');

function printOSInfo() {
    console.log('Платформа:', os.platform());
    console.log('Свободная память (GB):', (os.freemem() / 1024 / 1024 / 1024).toFixed(2));
    console.log('Главная директория:', os.homedir());
    console.log('Имя пользователя:', os.userInfo().username);
    console.log('Сетевые интерфейсы:', os.networkInterfaces());
}

function isFreeMemoryMoreThan4GB() {
    const freeMemGB = os.freemem() / 1024 / 1024 / 1024;
    return freeMemGB > 4;
}

function conditionalPrintOSInfo() {
    const mode = process.env.MODE;
    if (mode === 'admin') {
        printOSInfo();
    } else {
        console.log('Доступ запрещён. Режим:', mode);
    }
}

conditionalPrintOSInfo();
