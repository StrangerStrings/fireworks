import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { Firework, Firework1 } from "../FireworkUtility";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-a")
export class FireworkA extends LitElement{
	static styles = [
		defaultStyles,
		css`
			.firework{
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
			/*todoo add another class when it explodes so it's a different speed coming down than up. */
		`
	];

	@property({type: Object}) deets: Firework1;

	@internalProperty() size: number = 10;
	@internalProperty() y: number = 0;
	@internalProperty() x: number = 0;
	
	@internalProperty() color: string = 'yellow';
	



	connectedCallback(): void {
		super.connectedCallback();
		this.x = this.deets.x

		setTimeout(() => {
			this.y = this.deets.top;
			this.x = this.x + this.deets.drift
		},50)

		setTimeout(() => {
			this.color = this.deets.color
			this.size = this.deets.maxSize
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
