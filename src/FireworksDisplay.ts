import { css, customElement, html, internalProperty, LitElement, TemplateResult }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import './components/FireworkA';
import './components/FireworkB';
import { CreateFirework, Firework } from "./FireworkUtility";

@customElement('fireworks-display')
/**
 * The night sky on which our fireworks explode onto.
 * Also creates new fireworks and manages disposal of the old.
 */
export class FireworksDisplay extends LitElement {
	static styles = [
		defaultStyles,
		css`
			.sky {
				height: 100%;
				overflow: hidden;
				background: linear-gradient(0deg, 
					rgba(56,16,119,1) 0%, 
					rgba(2,40,105,1) 20%, 
					rgba(0,0,0,1) 60%, 
					rgba(0,0,0,1) 100%);
			}
		`
	];

	/** So i don't keep adding to the same array forever i'm using two 'batches'.
	 * This number states whether it's currently pushing to fireworks1 or fireworks2.
	 * When the current batch is full (see this.maxFireworks), 
	 * it'll wipe the other array and start pushing fireworks to that instead. 
	 * This way i can limit memory use without visual disturbance. */
	fireworksBatch: 1|2 = 1;
	maxFireworks = 100;

	@internalProperty() fireworks1: Firework[] = [];
	@internalProperty() fireworks2: Firework[] = [];
	

	connectedCallback(): void {
		super.connectedCallback();
  	window.addEventListener('keypress', this.FIRE.bind(this));
	}


	/** Main function: Creates new firework, adds it to the screen, manages batches */
	FIRE(ev: KeyboardEvent) {
		const newFirework = CreateFirework(ev.key);
		
		const fireworksBatch = this.getCurrentBatch();
		fireworksBatch.push(newFirework);

		if (fireworksBatch.length >= this.maxFireworks) {
			this.switchBatchAndClearFireworks();
		} 

		this.fireworks1 = [...this.fireworks1];
		this.fireworks2 = [...this.fireworks2];
	}

	switchBatchAndClearFireworks() {
		this.fireworksBatch = this.fireworksBatch == 1 ? 2 : 1;

		const batchToEmpty = this.getCurrentBatch();
		batchToEmpty.length = 0;
	}

	getCurrentBatch(): Firework[] {
		if (this.fireworksBatch == 1) {
			return this.fireworks1;
		} else if (this.fireworksBatch == 2) {
			return this.fireworks2;
		}
	}
	
	

	renderFirework(firework: Firework): TemplateResult {
		switch (firework.type) {
			case 'Firework1': 
				return html`<firework-a .config=${firework}></firework-a>`;
			case 'Firework2':
				return html`<firework-b .config=${firework}></firework-b>`;
		}
	}

	render() {
		var fireworks1 = this.fireworks1.map((fw) => this.renderFirework(fw));
		var fireworks2 = this.fireworks2.map((fw) => this.renderFirework(fw));

		return html`
			<div class="sky">
				${fireworks1}
				${fireworks2}
			</div>
		`;
	}
}




/**
 * _ _ _ _The Plan_ _ _ _
 * Create a multipart firework
 * Make some randomizer functions
 * Make 'spores' a random amount between 2 and 5
 * Figure out a good system for chaining setTimeouts
 * Different expand/contract speed
 * maybe, move the createFirework methods to their component files
 * think of different names for firework components and configs
 */