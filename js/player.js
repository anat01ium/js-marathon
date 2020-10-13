// import random from "./random.js";

class Selectors {
	constructor(player) {
		this.$playerImg = document.getElementById(`${player}-img`);
		this.$playerName = document.getElementById(`${player}-name`);
		this.$playerHealth = document.getElementById(`${player}-health`);
		this.$playerProgressbar = document.getElementById(`${player}-progressbar`);
	}
}

class Player extends Selectors {
	constructor({ selectors, id, img, name, type, hp, attacks }) {
		super(selectors);

		this.id = id;
		this.img = img;
		this.name = name;
		this.type = type;
		this.hp = {
			current: hp,
			total: hp
		};
		this.attacks = attacks;

		this.renderImg();
		this.renderName();
		this.renderHealth();
	}

	renderImg = () => {
		const { $playerImg, img } = this;
		$playerImg.src = img;
	}

	renderName = () => {
		const { $playerName, name } = this;
		$playerName.innerText = name;
	}

	renderHealth = () => {
		const { $playerHealth, $playerProgressbar, hp: { current, total } } = this;
		const percent = current / total * 100;		
		$playerHealth.innerText = `${current} / ${total}`;
		$playerProgressbar.style.width = `${percent}%`;

		if (percent < 60 && percent > 20) {
			$playerProgressbar.classList.add('low'); 
		} else if (percent < 20) {
			$playerProgressbar.classList.add('critical');
		}
	}

	// changeHealth = (maxDamage, minDamage, cb) => {
	changeHealth = (damage, cb) => {
		const { hp } = this;
		// const damage = random(maxDamage, minDamage);
		const healthStats = `${-damage} [${hp.current}/${hp.total}]`;
		hp.current -= damage;
	
		if (hp.current <= 0) { hp.current = 0; }
	
		this.renderHealth();
		cb && cb(healthStats);
	}
}

export default Player;
