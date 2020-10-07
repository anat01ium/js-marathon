class Selectors {
	constructor(name) {
		this.$health = document.getElementById(`health-${name}`);
		this.$progressbar = document.getElementById(`progressbar-${name}`);
	}
}

class Pokemon extends Selectors {
	constructor({ selectors, name, health }) {
		super(selectors);

		this.name = name;
		this.health = {
			current: health,
			total: health
		};

		this.renderHealth;
	}

	renderHealth = () => {
		const { $health, $progressbar, health: { current, total } } = this;
		
		$health.innerText = `${current} / ${total}`;
		$progressbar.style.width = `${current / total * 100}%`;
	}

	changeHealth = (strength, cb) => {
		const { health } = this;
		const kick = Math.ceil(Math.random() * strength);
		const healthStatus = `${-kick} [${health.current}/${health.total}]`;
		
		health.current -= kick;
	
		if (health.current <= 0) {	health.current = 0; }
	
		this.renderHealth();
		cb && cb(healthStatus);
	}
}

export default Pokemon;
