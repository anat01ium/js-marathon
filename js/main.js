import Pokemon from "./pokemon.js";

const $btnKick = document.getElementById('btn-kick');
const $btnKickEnemy = document.getElementById('btn-kick-enemy');

const player1 = new Pokemon({
   selectors: 'character',
   name: 'Pikachu',
   health: 150
});

const player2 = new Pokemon({
   selectors: 'enemy',
   name: 'Charmander',
   health: 100
});

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

function generateLog(player1, player2) {
   const { name: characterName } = player1;
   const { name: enemyName } = player2;

   const logs = [
      `${characterName} вспомнил что-то важное, но неожиданно ${enemyName}, не помня себя от испуга, ударил в предплечье врага.`,
      `${characterName} поперхнулся, и за это ${enemyName} с испугу приложил прямой удар коленом в лоб врага.`,
      `${characterName} забылся, но в это время наглый ${enemyName}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
      `${characterName} пришел в себя, но неожиданно ${enemyName} случайно нанес мощнейший удар.`,
      `${characterName} поперхнулся, но в это время ${enemyName} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
      `${characterName} удивился, а ${enemyName} пошатнувшись влепил подлый удар.`,
      `${characterName} высморкался, но неожиданно ${enemyName} провел дробящий удар.`,
      `${characterName} пошатнулся, и внезапно наглый ${enemyName} беспричинно ударил в ногу противника`,
      `${characterName} расстроился, как вдруг, неожиданно ${enemyName} случайно влепил стопой в живот соперника.`,
      `${characterName} пытался что-то сказать, но вдруг, неожиданно ${enemyName} со скуки, разбил бровь сопернику.`
   ];

   return logs[Math.floor(Math.random() * logs.length)];
}

function renderLog(person, healthStatus) {
   const $logs = document.querySelector('#logs');
   const $p = document.createElement('p');
   const log = person === player2 ? generateLog(person, player1) : generateLog(person, player2);

   $p.innerText = `${log} ${healthStatus}`;
   $logs.insertBefore($p, $logs.children[0]);
}

function renderBtnText (button, hit) {
   return button.innerText = `${hit.name} (${hit.count})`;
}

function countBtnClick(hit) {
   return (button) => {
      --hit.count;
      renderBtnText(button, hit);
      
      if (hit.count <= 0) { button.disabled = true; }
   }
}

function init() {
   const { thunderJolt, kickEnemy } = hits;
   const countBtnKick = countBtnClick(thunderJolt);
   const countBtnKickEnemy = countBtnClick(kickEnemy);

   renderBtnText($btnKick, thunderJolt);
   renderBtnText($btnKickEnemy, kickEnemy);
   player1.renderHealth();
   player2.renderHealth();

   $btnKick.addEventListener('click', () => {
      countBtnKick($btnKick);
      player1.changeHealth(thunderJolt.strength, (healthStatus) => {
         renderLog(player1, healthStatus);
      });
      player2.changeHealth(thunderJolt.strength, (healthStatus) => {
         renderLog(player2, healthStatus);
      });
   });
   
   $btnKickEnemy.addEventListener('click', () => {
      countBtnKickEnemy($btnKickEnemy);
      player2.changeHealth(thunderJolt.strength, (healthStatus) => {
         renderLog(player2, healthStatus);
      });
   });
}

init();
