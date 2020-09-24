const phone = prompt('Введите свой номер телефона:');

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