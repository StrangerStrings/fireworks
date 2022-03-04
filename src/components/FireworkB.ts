import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { CreateFireworkBase, Pos } from "../FireworkUtility";
import { Random, RandomInt } from "../Randomizer";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-b")
export class FireworkBcmp extends LitElement{
	static styles = [
		defaultStyles,
		fireworkStyles,
		css`
			.rocket {
				transition: 
					left 1s ease-in,
					bottom 1s ease-out,
					width 1s ease-out,
					height 1s ease-out, 
					backgroundColour 0.2s ease-out
			}
			.star {
				transition:
					left 1s ease-out,
					bottom 1s ease-out,
					width 0.5s ease-in,
					height 0.5s ease-in 
			}
		`
	];

	@property({type: Object}) config: FireworkB;

	@internalProperty() x: number;
	@internalProperty() y: number;
	@internalProperty() size: number;
	@internalProperty() rocketColor: string;
	
	@internalProperty() stars: Pos[] = [];
	@internalProperty() starSize: number = 0;
	@internalProperty() starColor: string;


	connectedCallback(): void {
		super.connectedCallback();

		this.setupValues()
		this.liftOff(20)
		this.explode(920)
		this.disappear(1500)
	}

	setupValues() {
		this.x = this.config.x
		this.y =  0;
		this.size =  10;
		this.rocketColor =  'yellow';

		this.starColor = this.config.color
		this.stars =	Array.from(
			{ length: this.config.stars.length }, 
			() => ({ x: 0, y: 0 })
		);
	}

	liftOff(timing: number) {
		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		}, timing)
	}

	explode(timing: number) {
		setTimeout(() => {
			this.stars = this.config.stars
			this.starSize = this.config.starSize
			
			this.size = 0;
		}, timing)
	}

	disappear(timing: number) {
		setTimeout(() => {
			this.starSize = 0
		}, timing)
	}


	render() {
		const rocketStyle = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			width: `${this.size}px`, 
			height: `${this.size}px`,
			background: `${this.rocketColor}`
		};

		const starStyles = this.stars.map(pos => ({
			left: `${pos.x}px`,
			bottom: `${pos.y}px`,
			width: `${this.starSize}px`,
			height: `${this.starSize}px`,
			background: `${this.starColor}`
		}))

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

/** Rocket firework that emitts a shower of stars  */
export type FireworkB = {
	type: 'FireworkB';
	x: number;
	drift: number;
	top: number;
	color: string;
	starSize: number;
	stars: Pos[];
}
export const createFireworkB = (
	color: string = 'white'
): FireworkB => {
	const type = 'FireworkB';

	const base = CreateFireworkBase(85, 10)

	const starSize = Random(20,30)
	const numberOfStars = RandomInt(3,5,1);
	const stars =	Array.from({ length: numberOfStars}, 
		() => ({ x: Random(-100,100), y: Random(-100,100) })
	);

	return {type, ...base, color, starSize, stars};
} 

export const createFireworkB_rain = (
	color: string = 'whitesmoke'
): FireworkB => {
	const type = 'FireworkB';

	const base = CreateFireworkBase(93, 10)

	const starSize = 7
	const numberOfStars = RandomInt(8,20);
	const stars =	Array.from(
		{ length: numberOfStars }, 
		() => ({ x: Random(-200,200), y: Random(-130,-30) })
	);

	return {type, ...base, color, starSize, stars};
} 
