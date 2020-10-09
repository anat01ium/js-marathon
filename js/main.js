import { pokemons } from "./pokemons.js";
import Player from "./player.js";
import generateLog from "./log.js";

const player1 = new Player({ selectors: 'player1', ...generatePlayer() });
const player2 = new Player({ selectors: 'player2', ...generatePlayer() });

function generatePlayer() {
   return pokemons[Math.floor(Math.random() * pokemons.length)];
}

function renderButtonText (button, attack) {
   return button.innerText = `${attack.name} (${attack.maxCount})`;
}

function countAttack(attack) {
   return (button) => {
      --attack.maxCount;
      renderButtonText(button, attack);
      
      if (attack.maxCount === 0) { button.disabled = true; }
   }
}

function init() {
   const $control = document.querySelector('.control');

   player1.attacks.forEach(item => {
      const { name, minDamage, maxDamage, maxCount } = item;
      const $button = document.createElement('button');
      const attackCounter = countAttack(item);

      $button.classList.add('button');
      $button.innerText = `${name} (${maxCount})`;
      $control.appendChild($button);
      
      $button.addEventListener('click', () => {
         attackCounter($button);
         player1.changeHealth(minDamage, maxDamage, (healthStatus) => {
            generateLog(player1, player2, healthStatus);
         });
         player2.changeHealth(minDamage, maxDamage, (healthStatus) => {
            generateLog(player2, player1, healthStatus);
         });
      });
   });
}

init();
