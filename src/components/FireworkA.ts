import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { CreateFireworkBase } from "../FireworkUtility";
import { Random } from "../Randomizer";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-a")
export class FireworkAcmp extends LitElement{
	static styles = [
		defaultStyles,
		fireworkStyles,
		css`
			.rocket{
				transition: 
					left 1s ease-in,
					bottom 1s ease-out,
					width 1s ease-out,
					height 1s ease-out, 
					background 0.6s ease-out
			}
			@keyframes liftoffexplode {

			}
		`
	];

	@property({type: Object}) config: FireworkA;

	@internalProperty() x: number;
	@internalProperty() y: number;
	@internalProperty() size: number;
	@internalProperty() color: string;
	
	
	connectedCallback(): void {
		super.connectedCallback();

		this.setupValues()
		this.liftOff(20)
		this.explode(1050)
		this.disappear(1900)
	}


	setupValues() {
		this.x = this.config.x
		this.y =  0;
		this.size =  10;
		this.color =  'yellow';
	}

	liftOff(timing: number) {
		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		}, timing)
	}

	explode(timing: number) {
		setTimeout(() => {
			this.color = this.config.color
			this.size = this.config.maxSize
		}, timing)
	}

	disappear(timing: number) {
		setTimeout(() => {
			this.size = 0;
		}, timing)
	}


	render() {
		const style = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			width: `${this.size}px`, 
			height: `${this.size}px`,
			background: `${this.color}`
		};

		return html`<div class="rocket" style=${styleMap(style)}></div>`;
	}
}


/** Simple rocket firework that makes a colored circle that expands and contracts  */
export type FireworkA = {
	type: 'FireworkA';
	x: number;
	drift: number;
	top: number;
	maxSize: number;
	color: string;
}

export const createFireworkA = (
	color: string = 'purple', 
	baseMaxSize: number = 80
): FireworkA => {
	const type = 'FireworkA';

	const base = CreateFireworkBase()
	const maxSize = Random(baseMaxSize, baseMaxSize + 100);
	
	return {type, ...base, maxSize, color};
} 
