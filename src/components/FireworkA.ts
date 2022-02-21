import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { Firework } from "../types";

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
				transform: translate(-50%, -50%);
				transition: height 2s linear, width 2s linear;
			}
		`
	];

	@property({type: Object}) deets: Firework;

	@internalProperty() size: number;

	connectedCallback(): void {
		super.connectedCallback();
		this.size = this.deets.maxSize/10;

		setTimeout(() => {
			this.size = this.deets.maxSize;
		},50)

		setTimeout(() => {
			this.size = 0;
		},2000)
	}

	render() {
		const styles = {
			width: `${this.size}px`, 
			height: `${this.size}px`,
			left: `${this.deets.x}%`,
			top: `${this.deets.y}%`,
			background: `${this.deets.color}`,
		};

		return html`<div class="firework" style=${styleMap(styles)}></div>`;
	}

}
