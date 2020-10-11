import random from "./random.js";

function renderLog(log) {
   const $logs = document.querySelector('#logs');
   const $p = document.createElement('p');
	$p.innerText = log;
	$logs.insertBefore($p, $logs.children[0]);
}

function generateLog(victim, attacker, stats) {
   const logs = [
      `${victim} вспомнил что-то важное, но неожиданно ${attacker}, не помня себя от испуга, ударил в предплечье врага.`,
      `${victim} поперхнулся, и за это ${attacker} с испугу приложил прямой удар коленом в лоб врага.`,
      `${victim} забылся, но в это время наглый ${attacker}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
      `${victim} пришел в себя, но неожиданно ${attacker} случайно нанес мощнейший удар.`,
      `${victim} поперхнулся, но в это время ${attacker} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
      `${victim} удивился, а ${attacker} пошатнувшись влепил подлый удар.`,
      `${victim} высморкался, но неожиданно ${attacker} провел дробящий удар.`,
      `${victim} пошатнулся, и внезапно наглый ${attacker} беспричинно ударил в ногу противника`,
      `${victim} расстроился, как вдруг, неожиданно ${attacker} случайно влепил стопой в живот соперника.`,
      `${victim} пытался что-то сказать, но вдруг, неожиданно ${attacker} со скуки, разбил бровь сопернику.`
   ];

	const randomLog = `${logs[random(logs.length)]} ${stats}`;
   return renderLog(randomLog);
}

export default generateLog;
