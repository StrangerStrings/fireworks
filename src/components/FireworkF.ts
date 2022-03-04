import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { CreateFireworkBase, Pos } from "../FireworkUtility";
import { Random, RandomInt } from "../Randomizer";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-f")
export class FireworkFcmp extends LitElement{
	static styles = [
		defaultStyles,
		fireworkStyles,
		css`
			.star {
				background: white;
				opacity: 0;
			}

			@keyframes flash {
				0% {
					opacity: 0;
				}
				15% {
					opacity: 0.1;
				}
				30% {
					opacity: 0.6;
				}
				75% {
					opacity: 0.1;
				}
				100% {
					opacity: 0;
				}
			}
		`
	];

	@property({type: Object}) config: FireworkF;

	@internalProperty() y: number;
	@internalProperty() x: number;
	@internalProperty() color: string;
	
	@internalProperty() size: number;
	@internalProperty() rocketSizetransition: number = 0;
	
	@internalProperty() starPositions: Pos[] = [];
	@internalProperty() starSize: number;
	
	@internalProperty() flash: boolean = false;
	@internalProperty() timePerFlash: number;


	connectedCallback(): void {
		super.connectedCallback();

		this.setupValues()

		this.liftOff(30)

		this.preExplodeContraction(730)
		this.explode(1700)
		this.sparkle(1750)

		this.disappear(1900)
	}


	setupValues() {
		this.color = 'blue'
		this.size = 25
		this.y = 0
		this.x = this.config.x

		this.starPositions = this.config.stars
		this.starSize = this.config.starSize
		
		const length = this.starPositions.length
		this.timePerFlash = 700/length
	}

	liftOff(timing: number) {
		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		}, timing)
	}

	preExplodeContraction(timing: number) {
		setTimeout(() => {
			this.rocketSizetransition = 1
			this.size = 7;
		}, timing)
	}

	explode(timing: number) {
		setTimeout(() => {
			this.rocketSizetransition = 0.25
			this.size = 200;
		}, timing)
	}

	sparkle(timing: number) {
		setTimeout(() => {
			this.flash = true
		}, timing)
	}

	disappear(timing: number) {
		setTimeout(() => {
			this.rocketSizetransition = 0.4
			this.size = 0;
		}, timing)
	}


	render() {
		const rocketStyle = {
			width: `${this.size}px`, 
			height: `${this.size}px`,
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			background: `${this.color}`,
			transition: `
				height ${this.rocketSizetransition}s ease-out, 
				width ${this.rocketSizetransition}s ease-out,
				bottom 1.7s ease-out,
				left 1.7s ease-in`
		};


		const starStyles = this.starPositions.map((pos, idx) => {
			const flash = this.flash ? 'flash' : 'no-animation'
			const delay = idx * this.timePerFlash
			const repeats = idx % 3 + 1
			return {
				left: `${pos.x}px`,
				bottom: `${pos.y}px`,
				height: `${this.starSize}px`,
				width: `${this.starSize}px`,
				animation: `${flash} 0.7s ${delay}ms ${repeats}`
			}
		});

		const stars = starStyles.map(starStyle => 
			html`<div class="star" style=${styleMap(starStyle)}></div>`
		);


		return html`
			<div class="rocket" style=${styleMap(rocketStyle)}>
				<div class="relative">
					${stars}
				</div>
			</div>
		`;
	}
}


/** Rocket Firework that releases series of stars that sparkle and fizz one by one */
export type FireworkF = {
	type: 'FireworkF';
	x: number;
	drift: number;
	top: number;
	starSize: number;
	stars: Pos[]
}
export const createFireworkF = (): FireworkF => {
	const type = 'FireworkF';

	const base = CreateFireworkBase(65, 20)

	const starSize = Random(15,25)
	const numberOfStars = RandomInt(50,150);
	const stars =	Array.from({ length: numberOfStars}, 
		() => ({ x: Random(-150,150,100), y: Random(-100,100,30) })
	);

	return {type, ...base, starSize, stars};
} 
