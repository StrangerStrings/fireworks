import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { FireworkF, Pos } from "../FireworkUtility";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-f")
export class FireworkFcmp extends LitElement{
	static styles = [
		defaultStyles,
		fireworkStyles,
		css`
			.spore {
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
	
	@internalProperty() sporePositions: Pos[] = [];
	@internalProperty() sporeSize: number;
	
	@internalProperty() flash: boolean = false;
	@internalProperty() timePerFlash: number;


	connectedCallback(): void {
		super.connectedCallback();

		this.setStartingValues()

		this.liftOff(30)

		this.preExplodeContraction(730)
		this.explode(1700)
		this.sparkle(1750)

		this.disappear(1900)
	}


	setStartingValues() {
		this.color = 'blue'
		this.size = 25
		this.y = 0
		this.x = this.config.x

		this.sporePositions = this.config.spores
		this.sporeSize = this.config.sporeSize
		
		const length = this.sporePositions.length
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


		const sporeStyles = this.sporePositions.map((pos, idx) => {
			const flash = this.flash ? 'flash' : 'no-animation'
			const delay = idx * this.timePerFlash
			const repeats = idx % 3 + 1
			return {
				left: `${pos.x}px`,
				bottom: `${pos.y}px`,
				height: `${this.sporeSize}px`,
				width: `${this.sporeSize}px`,
				animation: `${flash} 0.7s ${delay}ms ${repeats}`
			}
		});

		const spores = sporeStyles.map(sporeStyle => 
			html`<div class="spore" style=${styleMap(sporeStyle)}></div>`
		);


		return html`
			<div class="rocket" style=${styleMap(rocketStyle)}>
				<div class="relative">
					${spores}
				</div>
			</div>
		`;
	}
}
