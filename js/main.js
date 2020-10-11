import random from "./random.js";
import countAttack from "./count.js";
import generateLog from "./log.js";
import Player from "./player.js";
// import { pokemons } from "./pokemons.js";

class Game {
	getPokemons = async () => {
		const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
		const body = await response.json();
		return body;
	}

	getKick = async (id_attack, id_player1, id_player2) => {
		const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${id_player1}&attackId=${id_attack}&player2id=${id_player2}`);
		const body = await response.json();
		return body;
	}

	resetBoard = () => {
		document.querySelectorAll('.health').forEach(item => item.classList.remove('low', 'critical'));
		document.querySelector('.control').innerHTML = '';
		document.querySelector('#logs').innerHTML = '';
	}

	renderAttackButtons = (player1, player2) => {
		player1.attacks.forEach(item => {
			const { id, name, minDamage, maxDamage, maxCount } = item;
			const attackCounter = countAttack(item);
			const $control = document.querySelector('.control');
			
			const $attackButton = document.createElement('button');
			$attackButton.classList.add('button');
			$attackButton.innerText = `${name} (${maxCount})`;
			$control.appendChild($attackButton);
			$attackButton.addEventListener('click', async () => {
				const damage = await this.getKick(id, player1.id, player2.id);
				attackCounter($attackButton);

				// player2.changeHealth(maxDamage, minDamage, (healthStats) => {
				player2.changeHealth(damage.kick.player2, (healthStats) => {
					generateLog(player2.name, player1.name, healthStats);
					if (player2.hp.current <= 0) { 
						this.over(player2.name);
						
						const $nextButton = document.createElement('button');
						$nextButton.classList.add('button');
						$nextButton.innerText = 'Следующий!';
						$control.appendChild($nextButton);
						$nextButton.addEventListener('click', () => this.next(player1));
					}
				});

				// player1.changeHealth(player2.attacks[0].maxDamage, player2.attacks[0].minDamage, (healthStats) => {
				player1.changeHealth(damage.kick.player1, (healthStats) => {	
					generateLog(player1.name, player2.name, healthStats);
					if (player1.hp.current <= 0) {
						this.over(player1.name)
					}
				});
			});
		});		
	}

	start = async () => {
		const pokemons = await this.getPokemons();
		const player1 = new Player({ selectors: 'player1', ...pokemons[random(pokemons.length)] });
		const player2 = new Player({ selectors: 'player2', ...pokemons[random(pokemons.length)] });

		this.resetBoard();
		this.renderAttackButtons(player1, player2);
	}

	over = (name) => {
		const allButtons = document.querySelectorAll('.control .button');
		allButtons.forEach($item => $item.remove());
		
		const $control = document.querySelector('.control');

		const $p = document.createElement('p');
		$p.innerText = `Бедному ${name} хана, Finish Him!`;
		$control.appendChild($p);
		
		const $againButton = document.createElement('button');
		$againButton.classList.add('button');
		$againButton.innerText = 'Заново?';
		$control.appendChild($againButton);
		$againButton.addEventListener('click', () => this.start());
	}

	next = async (winner) => {
		const pokemons = await this.getPokemons();

		const player1 = winner;
		player1.hp.current = player1.hp.total;
		player1.renderHealth();

		const player2 = new Player({ selectors: 'player2', ...pokemons[random(pokemons.length)] });

		this.resetBoard();
		this.renderAttackButtons(player1, player2);
	}
}

const game = new Game();
game.start();
