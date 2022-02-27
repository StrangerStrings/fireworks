import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { Firework4, Pos } from "../FireworkUtility";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-d")
export class FireworkD extends LitElement{
	static styles = [
		defaultStyles,
		css`
			* {
				position: absolute;
				transform: translate(-50%, 50%);
				border-radius: 50%;
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
					left 1s linear,
					height 0.5s ease-in, 
					width 0.5s ease-in
			}

      .claz .spore {
				transition:
					bottom 1s ease-in,
					left 0.5s linear,
					height 0.5s ease-in, 
					width 0.5s ease-in
      }
		`
	];

	@property({type: Object}) config: Firework4;

	@internalProperty() size: number = 0;
	@internalProperty() y: number = 0;
	@internalProperty() x: number = 0;
	@internalProperty() color: string = 'yellow';
	
	@internalProperty() sporePositions: Pos[] = [];
	@internalProperty() sporeSize: number = 0;

	@internalProperty() claz: boolean = false;

	connectedCallback(): void {
		super.connectedCallback();

		this.x = this.config.x
		this.color = this.config.color

		this.sporePositions =	Array.from(
			{ length: this.config.spores.length }, 
			() => ({ x: 0, y: 0 })
		);

    this.sporeSize = this.config.sporeSize/1.5
		
		setTimeout(() => {
      this.sporePositions = this.config.spores;
      this.sporeSize = this.config.sporeSize
		}, 30)

		setTimeout(() => {
      this.claz = true;

			this.sporePositions = this.config.spores.map(sp => ({
        x: sp.x*1.3, y: sp.y*0.3
      }))
      this.sporeSize = this.config.sporeSize/2
		}, 1030)

		setTimeout(() => {
      this.sporeSize = 0
		}, 1530)
	}


	render() {
		const rocketStyle = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
		};

		const sporeStyles = this.sporePositions.map(pos => ({
			left: `${pos.x}px`,
			bottom: `${pos.y}px`,
			height: `${this.sporeSize}px`,
			width: `${this.sporeSize}px`,
			background: `${this.color}`,

		}))

		const spores = sporeStyles.map(sporeStyle => 
			html`<div class="spore" style=${styleMap(sporeStyle)}></div>`
		);

    const claz = {
      claz: this.claz
    }

		return html`
			<div class=${classMap(claz)} style=${styleMap(rocketStyle)}>
				<div class="relative">
					${spores}
				</div>
			</div>
		`;
	}
}
