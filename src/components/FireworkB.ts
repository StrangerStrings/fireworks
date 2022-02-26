import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { Firework2 } from "../FireworkUtility";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-b")
export class FireworkB extends LitElement{
	static styles = [
		defaultStyles,
		css`
			.firework {
				position: absolute;
				border-radius: 50%;
				transform: translate(-50%, 50%);
				transition: 
					height 1s ease-out, 
					width 1s ease-out,
					bottom 1s ease-out,
					left 1s ease-in,
					backgroundColour 0.2s ease-out
			}
			.relative {
				position:relative;
				left: 50%;
				top: 50%;
			}
			.spore {
				position: absolute;
				transform: translate(-50%, 50%);
				border-radius: 50%;
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
	

	@internalProperty() spore1left: number = 0;
	@internalProperty() spore1bottom: number = 0;

	@internalProperty() spore2left: number = 0;
	@internalProperty() spore2bottom: number = 0;

	@internalProperty() spore3left: number = 0;
	@internalProperty() spore3bottom: number = 0;

	@internalProperty() sporeSize: number = 0;


	connectedCallback(): void {
		super.connectedCallback();
		this.x = this.config.x
		
		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		},30)

		setTimeout(() => {
			this.spore1left = this.config.spores[0].x
			this.spore1bottom = this.config.spores[0].y

			this.spore2left = this.config.spores[1].x
			this.spore2bottom = this.config.spores[1].y

			this.spore3left = this.config.spores[2].x
			this.spore3bottom = this.config.spores[2].y
			
			this.sporeSize = 30
			this.size = 0;
		},930)

		setTimeout(() => {
			this.sporeSize = 0
		},1500)
	}

	render() {
		const styles = {
			width: `${this.size}px`, 
			height: `${this.size}px`,
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			background: `${this.color}`,
		};

		const spore1Style = {
			left: `${this.spore1left}px`,
			bottom: `${this.spore1bottom}px`,
			height: `${this.sporeSize}px`,
			width: `${this.sporeSize}px`
		}

		const spore2Style = {
			left: `${this.spore2left}px`,
			bottom: `${this.spore2bottom}px`,
			height: `${this.sporeSize}px`,
			width: `${this.sporeSize}px`
		}

		const spore3Style = {
			left: `${this.spore3left}px`,
			bottom: `${this.spore3bottom}px`,
			height: `${this.sporeSize}px`,
			width: `${this.sporeSize}px`
		}

		return html`
			<div class="firework" style=${styleMap(styles)}>
				<div class="relative">
					<div class="spore" style=${styleMap(spore1Style)}></div>
					<div class="spore" style=${styleMap(spore2Style)}></div>
					<div class="spore" style=${styleMap(spore3Style)}></div>
				</div>
			</div>
		`;
	}
}
