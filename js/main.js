const $btnKick = document.getElementById('btn-kick');
const $btnKickEnemy = document.getElementById('btn-kick-enemy');

const character = {
   id: 'character',
   name: 'Pikachu',
   defaultHP: 150,
   damageHP: 150,
   renderHP: renderHP,
   changeHP: changeHP
};

const enemy = {
   id: 'enemy',
   name: 'Charmander',
   defaultHP: 100,
   damageHP: 100,
   renderHP: renderHP,
   changeHP: changeHP
};

function renderHP() {
   const $health = document.getElementById(`health-${this.id}`);
   const $progressbar = document.getElementById(`progressbar-${this.id}`);

   $health.innerText = `${this.damageHP} / ${this.defaultHP}`;
   $progressbar.style.width = `${this.damageHP / this.defaultHP * 100}%`;
}

function changeHP(count) {
   this.damageHP -= Math.ceil(Math.random() * count);

   if (this.damageHP <= 0) {
      this.damageHP = 0;
      $btnKick.disabled = true;
      $btnKickEnemy.disabled = true;
      alert(`Бедному ${this.name} хана, Finish Him!`);
   }

   this.renderHP();
}

function init() {
   character.renderHP();
   enemy.renderHP();
   $btnKick.addEventListener('click', () => {
      character.changeHP(20);
      enemy.changeHP(20);
   });
   $btnKickEnemy.addEventListener('click', () => {
      enemy.changeHP(40);
   });
}

init();
