class Selectors {
	constructor(player) {
		this.$img = document.getElementById(`img-${player}`);
		this.$name = document.getElementById(`name-${player}`);
		this.$health = document.getElementById(`health-${player}`);
		this.$progressbar = document.getElementById(`progressbar-${player}`);
	}
}

class Player extends Selectors {
	constructor({ selectors, img, name, type, health, attacks }) {
		super(selectors);

		this.img = img;
		this.name = name;
		this.type = type;
		this.health = {
			current: health,
			total: health
		};
		this.attacks = attacks;

		this.renderImg();
		this.renderName();
		this.renderHealth();
	}

	renderImg = () => {
		const { $img, img } = this;

		$img.src = img;
	}

	renderName = () => {
		const { $name, name } = this;

		$name.innerText = name;
	}

	renderHealth = () => {
		const { $health, $progressbar, health: { current, total } } = this;
		const $healthColor = document.querySelector('.health');
		const percent = current / total * 100;

		$health.innerText = `${current} / ${total}`;
		$progressbar.style.width = `${percent}%`;


		if (percent > 20 && percent < 60) {
			$healthColor.classList.add('low'); 
		} else if (percent < 20) {
			$healthColor.classList.add('critical');
		}
	}

	changeHealth = (minDamage, maxDamage, cb) => {
		const { health } = this;
		const damage = Math.floor(Math.random() * (maxDamage - minDamage)) + minDamage;
		const healthStatus = `${-damage} [${health.current}/${health.total}]`;

		health.current -= damage;
	
		if (health.current <= 0) {	health.current = 0; }
	
		this.renderHealth();
		cb && cb(healthStatus);
	}
}

export default Player;
