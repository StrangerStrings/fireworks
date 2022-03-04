import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { CreateFireworkBase, Pos } from "../FireworkUtility";
import { Random } from "../Randomizer";

const baz = 'ease-out'

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-e")
export class FireworkEcmp extends LitElement{
	static styles = [
		defaultStyles,
    fireworkStyles,
		css`
			.rocket {
				transition: 
					left 1s ease-in,
					bottom 1s ease-out,
					width 0.5s ease-out,
					height 0.5s ease-out 
			}

			.flash {
				background: white;
			}
		`
	];

	@property({type: Object}) config: FireworkE;

	@internalProperty() x: number;
	@internalProperty() y: number;
	@internalProperty() size: number;
	@internalProperty() color: string;

	@internalProperty() flashSize: number;
	@internalProperty() flashOpacity: number;
	@internalProperty() opacityTransition: number;

	connectedCallback(): void {
		super.connectedCallback();

		this.setupValues()
		this.liftOff(20)
		this.explode(1020)
		this.fadeOut(1120)
	}


	setupValues() {
		this.x = this.config.x
		this.y =  0;
		this.size =  10;
		this.color = this.config.color

		this.flashOpacity = 0
	}

	liftOff(timing: number) {
		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		}, timing)
	}

	explode(timing: number) {
		setTimeout(() => {
			this.size = 0
			
			this.flashSize = this.config.flashSize
			this.opacityTransition = 0.1
			this.flashOpacity = 0.3
		}, timing)
	}

	fadeOut(timing: number) {
		setTimeout(() => {
			this.opacityTransition = 1
			this.flashOpacity = 0
		}, timing)
	}


	render() {
		const rocketStyle = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			width: `${this.size}px`,
			height: `${this.size}px`,
			background: `${this.color}`
		};
		
		const flashStyle = {
			opacity: `${this.flashOpacity}`,
			height: `${this.flashSize}px`,
			width: `${this.flashSize}px`,
			transition: `
				opacity ${this.opacityTransition}s ease-out	
			`
		}

		return html`
			<div class="rocket" style=${styleMap(rocketStyle)}>
				<div class="relative">
					<div class="flash" style=${styleMap(flashStyle)}></div>
				</div>
			</div>
		`;
	}
}


/** Firework that flashes quickly and brightly then fades*/
export type FireworkE = {
	type: 'FireworkE';
	x: number;
	drift: number;
	top: number;
	flashSize: number;
	color: string;
}
export const createFireworkE = (
	color: string = '#be5afa'
): FireworkE => {
	const type = 'FireworkE';

	const base = CreateFireworkBase(90, 15, false)

	const flashSize = Random(500,1000,300)

	return {type, ...base, flashSize, color};
}
 