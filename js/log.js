function renderLog(log) {
   const $logs = document.querySelector('#logs');
   const $p = document.createElement('p');

	$p.innerText = log;
	$logs.insertBefore($p, $logs.children[0]);
}

function generateLog(victim, attacker, healthStatus) {
   const logs = [
      `${victim.name} вспомнил что-то важное, но неожиданно ${attacker.name}, не помня себя от испуга, ударил в предплечье врага.`,
      `${victim.name} поперхнулся, и за это ${attacker.name} с испугу приложил прямой удар коленом в лоб врага.`,
      `${victim.name} забылся, но в это время наглый ${attacker.name}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
      `${victim.name} пришел в себя, но неожиданно ${attacker.name} случайно нанес мощнейший удар.`,
      `${victim.name} поперхнулся, но в это время ${attacker.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
      `${victim.name} удивился, а ${attacker.name} пошатнувшись влепил подлый удар.`,
      `${victim.name} высморкался, но неожиданно ${attacker.name} провел дробящий удар.`,
      `${victim.name} пошатнулся, и внезапно наглый ${attacker.name} беспричинно ударил в ногу противника`,
      `${victim.name} расстроился, как вдруг, неожиданно ${attacker.name} случайно влепил стопой в живот соперника.`,
      `${victim.name} пытался что-то сказать, но вдруг, неожиданно ${attacker.name} со скуки, разбил бровь сопернику.`
   ];

	const randomLog = `${logs[Math.floor(Math.random() * logs.length)]} ${healthStatus}`;

	return renderLog(randomLog);
}

export default generateLog;
