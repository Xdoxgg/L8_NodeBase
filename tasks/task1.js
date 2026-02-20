require('dotenv').config({ path: '../.env' }); // я его в gitignore не кидал, но мне кажется он должен там быть

console.log('Имя:', process.env.FIRST_NAME);
console.log('Фамилия:', process.env.LAST_NAME);
console.log('Номер группы:', process.env.GROUP_NUMBER);
console.log('Номер по списку:', process.env.LIST_NUMBER);
