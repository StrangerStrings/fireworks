import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { CreateFireworkBase } from "../FireworkUtility";
import { Random } from "../Randomizer";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-c")
export class FireworkCcpm extends LitElement{
	static styles = [
		defaultStyles,
    fireworkStyles,
		css`
			.firework{
				transition: 
					left 0.7s ease-in,
					bottom 0.7s ease-out,
					width 0.1s ease-out,
					height 0.1s ease-out, 
					backgroundColour 0.2s ease-out
			}
      .slowFade{
				transition: 
					left 1s ease-in,
					bottom 1s ease-out,
					width 0.7s ease-out,
					height 0.7s ease-out, 
					backgroundColour 0.2s ease-out
      }
		`
	];

	@property({type: Object}) config: FireworkC;

	@internalProperty() x: number;
	@internalProperty() y: number;
	@internalProperty() size: number;
	@internalProperty() color: string;
	
	@internalProperty() slowFade: boolean = false;


	connectedCallback(): void {
		super.connectedCallback();

		this.setupValues()
		this.liftOff(20)
		this.explode(730)
		this.fadeOut(780)
	}


	setupValues() {
		this.x = this.config.x
		this.y =  0;
		this.size =  10;
		this.color =  'blue';
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

	fadeOut(timing: number) {
		setTimeout(() => {
      this.slowFade = true
			this.size = 0;
		}, timing)
	}


	render() {
		const styles = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			width: `${this.size}px`, 
			height: `${this.size}px`,
			background: `${this.color}`
		};

    const classes = {
      firework: true,
      slowFade: this.slowFade
    } 

		return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(styles)}
      ></div>`;
	}

}


/** Simple firework that expands quickly and contracts slowly */
export type FireworkC = {
	type: 'FireworkC';
	x: number;
	drift: number;
	top: number;
	maxSize: number;
	color: string;
}

export const createFireworkC = (
	color: string = '#be6900', 
	baseMaxSize: number = 50
): FireworkC => {
	const type = 'FireworkC';
	const base = CreateFireworkBase()

	const maxSize = Random(baseMaxSize, baseMaxSize + 100);

	return {type, ...base, maxSize, color};
} 
