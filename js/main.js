const $btnKick = document.getElementById('btn-kick');
const $btnKickEnemy = document.getElementById('btn-kick-enemy');

const character = {
   name: 'Pikachu',
   defaultHP: 100,
   damageHP: 100,
   $health: document.getElementById('health-character'),
   $progressbar: document.getElementById('progressbar-character')
};

const enemy = {
   name: 'Charmander',
   defaultHP: 100,
   damageHP: 100,
   $health: document.getElementById('health-enemy'),
   $progressbar: document.getElementById('progressbar-enemy')
};

function renderHP(person) {
   person.$health.innerText = `${person.damageHP} / ${person.defaultHP}`;
   person.$progressbar.style.width = `${person.damageHP}%`;
}

function changeHP(person, count) {
   const power = Math.ceil(Math.random() * count);

   if (person.damageHP < power) {
      person.damageHP = 0;
      $btnKick.disabled = true;
      $btnKickEnemy.disabled = true;
      alert(`Бедному ${person.name} хана, Finish Him!`);
   } else {
      person.damageHP -= power;
   }

   renderHP(person);
}

function init() {
   renderHP(character);
   renderHP(enemy);
   $btnKick.addEventListener('click', () => {
      changeHP(character, 20);
      changeHP(enemy, 20);
   });
   $btnKickEnemy.addEventListener('click', () => {
      changeHP(enemy, 40);
   });
}

init();
