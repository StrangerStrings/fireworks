import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { Pos } from "../FireworkUtility";
import { Random, RandomInt } from "../Randomizer";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-d")
export class FireworkDcmp extends LitElement{
	static styles = [
		defaultStyles,
    fireworkStyles,
		css`
			.star {
				background: white;
				transition:
					bottom 1s ease-out,
					left 1s linear,
					height 0.5s ease-in, 
					width 0.5s ease-in
			}

      .falling .star {
				transition:
					bottom 1s ease-in,
					left 0.5s linear,
					height 0.4s ease-in, 
					width 0.4s ease-in
      }
		`
	];

	@property({type: Object}) config: FireworkD;

	@internalProperty() x: number;
	@internalProperty() y: number;
	@internalProperty() color: string;
	
	@internalProperty() falling: boolean;
	@internalProperty() starSize: number;
	@internalProperty() stars: Pos[];


	connectedCallback(): void {
		super.connectedCallback();

		this.setupValues()
		this.shootStars(20)
		this.starsFall(1020)
		this.disappear(1120)
	}


	setupValues() {
		this.x = this.config.x
		this.y = Random(0,5, 2)
		this.color = this.config.color

		this.falling = false
		this.starSize = this.config.starSize/1.5
		this.stars =	Array.from(
			{ length: this.config.stars.length }, 
			() => ({ x: 0, y: 0 })
		);
	}

	shootStars(timing: number) {
		setTimeout(() => {
      this.stars = this.config.stars;
      this.starSize = this.config.starSize
		}, timing)
	}

	starsFall(timing: number) {
		setTimeout(() => {
      this.falling = true;
			this.starSize = this.config.starSize/2
			this.stars = this.config.stars.map(sp => ({
        x: sp.x*1.3, y: sp.y*0.3
      }))
		}, timing)
	}

	disappear(timing: number) {
		setTimeout(() => {
      this.starSize = 0
		}, timing)
	}


	render() {
		const containerStyle = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
		};
    const containerClass = {
      falling: this.falling
    }

		const starStyles = this.stars.map(pos => ({
			left: `${pos.x}px`,
			bottom: `${pos.y}px`,
			width: `${this.starSize}px`,
			height: `${this.starSize}px`,
			background: `${this.color}`
		}))

		const stars = starStyles.map(starStyle => 
			html`<div class="star" style=${styleMap(starStyle)}></div>`
		);

		return html`
			<div 
				class=${classMap(containerClass)} 
				style=${styleMap(containerStyle)}
			>
				<div class="relative">
					${stars}
				</div>
			</div>
		`;
	}
}

/** Ground based Firework that shoots stars that rise and then fall */
export type FireworkD = {
	type: 'FireworkD';
	x: number;
	color: string;
	starSize: number;
	stars: Pos[];
}
export const createFireworkD = (
	color: string = '#78def2'
): FireworkD => {
	const type = 'FireworkD';

	const x = Random(3, 97);
	const starSize = Random(10,15)

	const numberOfStars = RandomInt(20,30);
	const maxHeight = Random(150,300)

	const stars =	Array.from(
		{ length: numberOfStars },
		() => ({ x: Random(-100,100), y: Random(50,maxHeight,50) })
	);

	return {type, x, starSize, stars, color};
} 
