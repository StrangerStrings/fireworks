import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { FireworkA } from "../FireworkUtility";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-a")
export class FireworkAcmp extends LitElement{
	static styles = [
		defaultStyles,
		fireworkStyles,
		css`
			.firework{
				transition: 
					height 1s ease-out, 
					width 1s ease-out,
					bottom 1s ease-out,
					left 1s ease-in,
					backgroundColour 0.2s ease-out
			}
			/*todoo add another class when it explodes so it's a different speed coming down than up. */
		`
	];

	@property({type: Object}) config: FireworkA;

	@internalProperty() size: number = 10;
	@internalProperty() y: number = 0;
	@internalProperty() x: number;
	@internalProperty() color: string = 'yellow';
	
	stage: number[] = []

	connectedCallback(): void {
		super.connectedCallback();
		this.x = this.config.x

		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		},10)

		setTimeout(() => {
			this.color = this.config.color
			this.size = this.config.maxSize
		},1050)

		setTimeout(() => {
			this.size = 0;
		},2000)
	}

	render() {
		const styles = {
			width: `${this.size}px`, 
			height: `${this.size}px`,
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			background: `${this.color}`,
		};

		return html`<div class="firework" style=${styleMap(styles)}></div>`;
	}

}
