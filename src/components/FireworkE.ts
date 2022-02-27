import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { FireworkE, Pos } from "../FireworkUtility";

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
					height 0.5s ease-out, 
					width 0.5s ease-out,
					bottom 1s ease-out,
					left 1s ease-in
			}

			.flash {
				left: 0;
				bottom: 0;
				background: white;
				transition:
					height 0.5s ease-in, 
					width 0.5s ease-in,
					opacity 0.1s ease-out
			}
			.claz {
				transition:
					height 0.5s ease-in, 
					width 0.5s ease-in,
					opacity 1s ease-out
			}
		`
	];

	@property({type: Object}) config: FireworkE;

	@internalProperty() size: number = 10;
	@internalProperty() y: number = 0;
	@internalProperty() x: number;
	@internalProperty() color: string = 'yellow';

	@internalProperty() flashOpacity: number = 0;

	@internalProperty() claz: boolean = false;

	connectedCallback(): void {
		super.connectedCallback();

		this.x = this.config.x
		this.color = 'white'
		
		this.color = this.config.color

		setTimeout(() => {
			this.y  = this.config.top
		}, 30)

		setTimeout(() => {
			this.size = 0
			this.flashOpacity = 0.3
		}, 1030)

		setTimeout(() => {
			this.claz = true
			this.flashOpacity = 0
		}, 1130)
	
	}


	render() {
		const rocketStyle = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			width: `${this.size}px`,
			height: `${this.size}px`,
			background: `${this.color}`
		};

    const rocketClass = {
			flash: true,
      claz: this.claz
    }
		
		const flashStyle = {
			opacity: `${this.flashOpacity}`,
			height: `${this.config.flashSize}px`,
			width: `${this.config.flashSize}px`
		}

		return html`
			<div class="rocket" style=${styleMap(rocketStyle)}>
				<div class="relative">
					<div class=${classMap(rocketClass)} style=${styleMap(flashStyle)}></div>
				</div>
			</div>
		`;
	}
}
