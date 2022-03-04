import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { createCircularStarArray, Pos } from "../FireworkUtility";
import { Random, RandomInt } from "../Randomizer";

/**
 * A firework, that lives, and then dies
 */
@customElement("firework-g")
export class FireworkGcmp extends LitElement{
	static styles = [
		defaultStyles,
    fireworkStyles,
		css`
			.star {
        height: 0px;
        width: 0px;
			}

      @keyframes spurt {

      }
		`
	];

	@property({type: Object}) config: FireworkG;

	@internalProperty() size: number;
	@internalProperty() y: number;
	@internalProperty() x: number;
	@internalProperty() color: string;
	
	@internalProperty() starPositions: Pos[];
	@internalProperty() starSize: number;
	@internalProperty() starOpacity: number;


	connectedCallback(): void {

		super.connectedCallback();

		this.setupValues()

    this.startSpinning(20)
	}


	setupValues() {		
    this.color = this.config.color
		this.y = this.config.y
		this.x = this.config.x

    this.starSize = 0
    this.starOpacity = 1
		this.starPositions =	Array.from(
			{ length: this.config.stars.length }, 
			() => ({ x: 0, y: 0 })
		);
	}

  startSpinning(timing: number) {
    	setTimeout(() => {
        this.starPositions = this.config.stars;
        this.starSize = this.config.starSize
        this.starOpacity = 0
    	}, timing)
  }


  //todoo: maybe add a explanding and pulsing (opacity-wise) circle behind


	render() {
		const containerStyle = {
			left: `${this.x}%`,
			bottom: `${this.y}%`,
		};

		const starStyles = this.starPositions.map((pos, idx) => {
      const delay = idx * 10
      return {
        left: `${pos.x}px`,
        bottom: `${pos.y}px`,
        width: `${this.starSize}px`,
        height: `${this.starSize}px`,
        opacity: `${this.starOpacity}`,
				background: `${this.color}`,
        transition: `
          left 0.5s ease-out ${delay}ms,
          bottom 0.5s ease-out ${delay}ms,
          width 0.3s ease-out ${delay}ms,
          height 0.3s ease-out ${delay}ms,
          opacity 0.2s ease-in ${delay+300}ms
        `
      }
    })

		const stars = starStyles.map(starStyle => 
			html`<div class="star" style=${styleMap(starStyle)}></div>`
		);

		return html`
			<div style=${styleMap(containerStyle)}>
				<div class="relative">
					${stars}
				</div>
			</div>
		`;
	}
}


/** Catherine wheel Yo */
export type FireworkG = {
	type: 'FireworkG';
	x: number;
	y: number;
	starSize: number;
	stars: Pos[];
	color: string;
}
export const createFireworkG = (
	color: string = 'pink'
): FireworkG => {
	const type = 'FireworkG';

	const x = Random(3, 97);
	const y = Random(8, 35, 10);

	const starSize = Random(10,15)

	const numberOfStars = RandomInt(50,70);
	const radius = Random(80, 120);
  const rotations = Random(2,3)
	const stars = createCircularStarArray(numberOfStars, radius, rotations, 0.2);

	return {type, x, y, starSize, stars, color};
} 
