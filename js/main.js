const $btnKick = document.getElementById('btn-kick');
const $btnKickEnemy = document.getElementById('btn-kick-enemy');

const character = {
   id: 'character',
   name: 'Pikachu',
   health: {
      current: 150,
      total: 150
   },
   renderHealth,
   changeHealth
};

const enemy = {
   id: 'enemy',
   name: 'Charmander',
   health: {
      current: 100,
      total: 100
   },
   renderHealth,
   changeHealth
};

const hits = {
   thunderJolt: {
      name: 'Thunder Jolt',
      strength: 20,
      count: 6
   },
   kickEnemy: {
      name: 'Kick Enemy',
      strength: 40,
      count: 4
   }
}

function generateLog(firstPerson, secondPerson) {
   const logs = [
      `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага.`,
      `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага.`,
      `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
      `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар.`,
      `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
      `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар.`,
      `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар.`,
      `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника`,
      `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника.`,
      `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику.`
   ];

   return logs[Math.floor(Math.random() * logs.length)];
}

function renderLog(person, healthStatus) {
   const $logs = document.querySelector('#logs');
   const $p = document.createElement('p');
   const log = person === enemy ? generateLog(person, character) : generateLog(person, enemy);

   $p.innerText = `${log} ${healthStatus}`;
   $logs.insertBefore($p, $logs.children[0]);
}

function renderHealth() {
   const { id, health: { current, total } } = this;
   const $health = document.getElementById(`health-${id}`);
   const $progressbar = document.getElementById(`progressbar-${id}`);

   $health.innerText = `${current} / ${total}`;
   $progressbar.style.width = `${current / total * 100}%`;
}

function changeHealth(strength) {
   const { name, health } = this;
   const kick = Math.ceil(Math.random() * strength);
   const healthStatus = `${-kick} [${health.current}/${health.total}]`;
   
   health.current -= kick;

   if (health.current <= 0) {
      health.current = 0;
      $btnKick.disabled = true;
      $btnKickEnemy.disabled = true;
      alert(`Бедному ${name} хана, Finish Him!`);
   }

   this.renderHealth();
   renderLog(this, healthStatus);
}

function renderBtnText (button, hit) {
   return button.innerText = `${hit.name} (${hit.count})`;
}

function countBtnClick(hit) {
   return (button) => {
      --hit.count;
      renderBtnText(button, hit);
      
      if (hit.count <= 0) {
         button.disabled = true;
      }
   }
}

function init() {
   const { thunderJolt, kickEnemy } = hits;
   const countBtnKick = countBtnClick(thunderJolt);
   const countBtnKickEnemy = countBtnClick(kickEnemy);

   renderBtnText($btnKick, thunderJolt);
   renderBtnText($btnKickEnemy, kickEnemy);
   character.renderHealth();
   enemy.renderHealth();

   $btnKick.addEventListener('click', () => {
      character.changeHealth(thunderJolt.strength);
      enemy.changeHealth(thunderJolt.strength);
      countBtnKick($btnKick);
   });

   $btnKickEnemy.addEventListener('click', () => {
      enemy.changeHealth(kickEnemy.strength);
      countBtnKickEnemy($btnKickEnemy);
   });
}

init();
