import { css, customElement, html, internalProperty, LitElement, property } from "lit-element";
import { defaultStyles, fireworkStyles } from "../defaultStyles";
import { classMap } from 'lit-html/directives/class-map';
import { styleMap } from 'lit-html/directives/style-map';
import { FireworkC } from "../FireworkUtility";

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
					height 0.1s ease-out, 
					width 0.1s ease-out,
					bottom 0.7s ease-out,
					left 0.7s ease-in,
					backgroundColour 0.2s ease-out
			}
      .asdf{
				transition: 
					height 0.7s ease-out, 
					width 0.7s ease-out,
					bottom 1s ease-out,
					left 1s ease-in,
					backgroundColour 0.2s ease-out
      }
			/*todoo add another class when it explodes so it's a different speed coming down than up. */
		`
	];

	@property({type: Object}) config: FireworkC;

	@internalProperty() size: number = 10;
	@internalProperty() y: number = 0;
	@internalProperty() x: number;
	@internalProperty() color: string = 'blue';
	
	@internalProperty() asdf: boolean = false;

	stage: number[] = []

	connectedCallback(): void {
		super.connectedCallback();
		this.x = this.config.x

		setTimeout(() => {
			this.y = this.config.top;
			this.x = this.x + this.config.drift
		},50)

		setTimeout(() => {
			this.color = this.config.color
			this.size = this.config.maxSize
		},760)
    
		setTimeout(() => {
      this.asdf = true
			this.size = 0;
		},810)
	}

	render() {
		const styles = {
			width: `${this.size}px`, 
			height: `${this.size}px`,
			left: `${this.x}%`,
			bottom: `${this.y}%`,
			background: `${this.color}`,
		};

    const classes = {
      firework: true,
      asdf: this.asdf
    } 

		return html`
      <div 
        class=${classMap(classes)}
        style=${styleMap(styles)}
      ></div>`;
	}

}
