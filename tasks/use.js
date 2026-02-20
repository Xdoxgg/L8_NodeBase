// use.js
const { loadData } = require('./dataLoader');
const { sortStringsIgnoringSpaces } = require('./stringSort');
const fsUtils = require('./fsUtils');

async function main() {
    // 1. Загрузить всех пользователей с JSONPlaceholder
    const url = 'https://jsonplaceholder.typicode.com/users';
    const result = await loadData(url);

    if (result.error) {
        console.error('Ошибка загрузки данных:', result.error);
        return;
    }

    const users = result.data;

    // 2. Отсортировать пользователей по имени (без учёта пробелов)
    const names = users.map(u => u.name);
    const sortedNames = sortStringsIgnoringSpaces(names);

    // 3. Создать структуру папок и файлов
    const folderPath = 'users';
    fsUtils.createFolder(folderPath);

    // Записать имена пользователей в names.txt
    const namesFile = `${folderPath}/names.txt`;
    fsUtils.writeFile(namesFile, sortedNames.join('\n'));

    // Записать email пользователей в emails.txt (в порядке сортировки имён)
    // Для этого сопоставим имена и email
    const nameToEmail = {};
    users.forEach(u => {
        nameToEmail[u.name] = u.email;
    });

    const sortedEmails = sortedNames.map(name => nameToEmail[name] || '');

    const emailsFile = `${folderPath}/emails.txt`;
    fsUtils.writeFile(emailsFile, sortedEmails.join('\n'));

    console.log('Папка users создана с файлами names.txt и emails.txt');
}

main().catch(console.error);
