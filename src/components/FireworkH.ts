import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { CreateFireworkBase, Pos } from "../FireworkUtility";
import { Random } from "../Randomizer";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-h")
export class FireworkHcmp extends LitElement{
	static styles = [
		defaultStyles,
		fireworkStyles,
		css`
    .rocket {
      transition:
					height 0.25s ease-out 0.6s, 
					width 0.25s ease-out 0.6s,
					bottom 0.65s ease-out,
					left 0.65s ease-in,
					backgroundColour 0.2s ease-out
    }
		`
	];

	@property({type: Object}) config: FireworkH;

	@internalProperty() y: number;
	@internalProperty() x: number;
	@internalProperty() flashSize: number;
	@internalProperty() color: string;
	@internalProperty() opacity: number;
	
	@internalProperty() sizeTransition: number;
	@internalProperty() opacityTransition: number;

	@internalProperty() rocketSize: number;
	@internalProperty() rocketColor: string;
  
	

	connectedCallback(): void {
		super.connectedCallback();

		this.setupValues();
    this.liftOff(30);
		this.explode(580);
	}


	setupValues() {
		this.color = this.config.color;
		this.flashSize = 0;
    
    this.rocketSize = 10;
    this.rocketColor = 'pink';
		this.y = 0;
		this.x = this.config.x;

    this.opacity = this.config.opacity;
    this.sizeTransition = 0.5;
    this.opacityTransition = 0.4;
	}

  liftOff(timing: number) {
		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift;

      this.rocketSize = 0;
		}, timing)
  }

	explode(timing: number) {
		setTimeout(() => {
      this.flashSize = this.config.size;
      this.opacity = 0;
		}, timing)
	}

	
	render() {
		const rocketStyle = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			width: `${this.rocketSize}px`, 
			height: `${this.rocketSize}px`,
			background: `${this.rocketColor}`
		};

		// this is a bit of a mess cause i couldn't figure out a neat way to do it mathmatically.
		// Essentially there's three flashes, each similar but with slightly sizes, opacity and transition timings..
		// ..based on the same component size and opacity properties, but multiplied by a number
		// so the first flash is 1* the size but only 0.4* the opacity, second is 0.55 the size but 0.7* opacity etc.
		const sizeMultipliers = 					[1,   0.55, 0.25];
		const opacityMultipliers = 				[0.4, 0.7,  1		];
		
		const sizeTransitionMultipliers = [1.5, 1.2,  1		];
		const sizeDelays = 								[0,   0.2,  0.4	];
		const opacityDelays = 						[0.7, 0.72, 0.75];

		const flashes =	Array.from(
			{ length: 3 }, 
			(_, idx) => {
				const size = this.flashSize * sizeMultipliers[idx];
				const opacity = this.opacity * opacityMultipliers[idx];
				
				const sizeTransition = this.sizeTransition * sizeTransitionMultipliers[idx];
				const sizeDelay = sizeDelays[idx];
				const opacityDelay = opacityDelays[idx];

				const style = {
					width: `${size}px`, 
					height: `${size}px`,
					background: `${this.color}`,
					opacity: `${opacity}`,
					transition: `
						height ${sizeTransition}s ease-out ${sizeDelay}s, 
						width ${sizeTransition}s ease-out ${sizeDelay}s,
						opacity ${this.opacityTransition}s ease-out ${opacityDelay}s
						`
				};

				return html`<div class="flash" style=${styleMap(style)}></div>`;
			}
		);

		return html`
			<div class="rocket" style=${styleMap(rocketStyle)}>
				<div class="relative">
					${flashes}
				</div>
			</div>
		`;
	}
}


/** Firework with three concentric flashes of decreasing opacity and increasing size */
export type FireworkH = {
	type: 'FireworkH';
	x: number;
	top: number;
  drift: number;
	size: number;
	opacity: number;
	color: string;
}
export const createFireworkH = (
	color: string = 'pink'
): FireworkH => {
	const type = 'FireworkH';

  const base = CreateFireworkBase()

	const size = Random(200,300, 50)
	const opacity = Random(0.3, 1)

	return {type, ...base, size, opacity, color};
} 
