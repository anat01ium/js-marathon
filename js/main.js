// Задание №1

const firstRow = prompt('Задание #1\nВведите первую строку:');
const secondRow = prompt('Введите вторую строку:');
const letter = prompt('Задайте букву для сравнения:');

function calcLetters(str) {
   let result = 0;

   for (let i = 0; i < str.length; ++i) {
      if (str.charAt(i) === letter) { ++result; }
   }

   return result;
}

function compareRows(firstRow, secondRow) {
   let result = '';

   if (calcLetters(firstRow) === 0 && calcLetters(secondRow) === 0) {
      result = 'Таких букв в строках нет';
   } else if (calcLetters(firstRow) === calcLetters(secondRow)) {
      result = `В строках одинаковое количество букв "${letter}"`;
   } else {
      result = `В этой строке больше букв "${letter}":\n`;
      result += calcLetters(firstRow) > calcLetters(secondRow) ? firstRow : secondRow;
   }

   return result;
}

alert(compareRows(firstRow, secondRow));



// Задание #2

const phone = prompt('Задание #2\nВведите свой номер телефона:');

function formatPhone(phone) {
   let result = '';

   if (!+phone) {
      result = 'Номер телефона должен состоять из цифр.';
   } else if (phone.length < 10 ||
              phone.length === 11 && phone.charAt(0) !== '8' ||
              phone.length < 12 && phone.charAt(0) === '+' ||
              phone.length > 12 ||
              phone.length === 12 && phone.charAt(0) === '+' && phone.charAt(1) !== '7') {
      result = 'Неверный формат номера.';
   } else {
      for (let i = 0; i < phone.length; ++i) {
         if (i === 0 && phone.length === 10) { result += '+7'; }
         if (i === 0 && phone.charAt(i) === '8') { result += '+7'; ++i; }
         if (i === phone.length - 10) { result += ' ('; }
         if (i === phone.length - 7) { result += ') '; }
         if (i === phone.length - 4 || i === phone.length - 2) { result += '-'; }

         result += phone.charAt(i);
      }
   }

   return result;
}

alert(`Результат:\n${formatPhone(phone)}`);
