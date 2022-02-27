import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { Firework2, Pos } from "../FireworkUtility";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-b")
export class FireworkB extends LitElement{
	static styles = [
		defaultStyles,
		css`
			* {
				position: absolute;
				transform: translate(-50%, 50%);
				border-radius: 50%;
			}
			.rocket {
				transition: 
					height 1s ease-out, 
					width 1s ease-out,
					bottom 1s ease-out,
					left 1s ease-in,
					backgroundColour 0.2s ease-out
			}
			/** Intermediate class so children can be 'absolute' */
			.relative {
				position: relative;
				transform: initial;
				left: 50%;
				top: 50%;
			}
			.spore {
				background: white;
				transition:
					bottom 1s ease-out,
					left 1s ease-out,
					height 0.5s ease-in, 
					width 0.5s ease-in
			}
		`
	];

	@property({type: Object}) config: Firework2;

	@internalProperty() size: number = 10;
	@internalProperty() y: number = 0;
	@internalProperty() x: number = 0;
	@internalProperty() color: string = 'yellow';
	
	@internalProperty() sporePositions: Pos[] = [];
	@internalProperty() sporeSize: number = 0;


	connectedCallback(): void {
		super.connectedCallback();

		this.x = this.config.x

		this.sporePositions =	Array.from(
			{ length: this.config.spores.length }, 
			() => ({ x: 0, y: 0 })
		);
		
		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		}, 30)

		setTimeout(() => {
			this.sporePositions = this.config.spores
			this.sporeSize = this.config.sporeSize
			
			this.size = 0;
		}, 930)

		setTimeout(() => {
			this.sporeSize = 0
		}, 1500)
	}


	render() {
		const rocketStyle = {
			width: `${this.size}px`, 
			height: `${this.size}px`,
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			background: `${this.color}`,
		};

		const sporeStyles = this.sporePositions.map(pos => ({
			left: `${pos.x}px`,
			bottom: `${pos.y}px`,
			height: `${this.sporeSize}px`,
			width: `${this.sporeSize}px`
		}))

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
