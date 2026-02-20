const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcrypt');

// Определяем файл .env в зависимости от NODE_ENV
const envFile = {
    production: '.env.production',
    development: '.env.development',
    domain: '.env.domain'
}[process.env.NODE_ENV] || '.env.development';

// Загружаем переменные окружения из нужного файла
dotenv.config({ path: path.resolve(__dirname, envFile) });

// Выводим текущий режим работы приложения
console.log('Текущий режим работы приложения:', process.env.MODE);

// Функция для параллельного шифрования паролей и измерения времени
async function hashPasswords() {
    const passwords = [
        'password1', 'password2', 'password3', 'password4', 'password5',
        'password6', 'password7', 'password8', 'password9', 'password10',
        'password11', 'password12', 'password13'
    ];

    const saltRounds = 10;

    // Массив промисов с замером времени для каждого пароля
    const hashPromises = passwords.map(async (pwd, i) => {
        const start = Date.now();
        await bcrypt.hash(pwd, saltRounds);
        const end = Date.now();
        const duration = end - start;
        console.log(`Пароль ${i + 1} зашифрован за ${duration} мс`);
        return duration;
    });

    const durations = await Promise.all(hashPromises);

    // Выводим среднее время шифрования
    const avg = durations.reduce((a, b) => a + b, 0) / durations.length;
    console.log('\nСреднее время шифрования пароля:', avg.toFixed(2), 'мс');
    console.log('Время варьируется из-за нагрузки на CPU и особенностей bcrypt, который использует адаптивный алгоритм с затратами по времени для повышения безопасности.');
}

// Запускаем функцию шифрования и ловим ошибки
hashPasswords().catch(err => {
    console.error('Ошибка при шифровании паролей:', err);
});
