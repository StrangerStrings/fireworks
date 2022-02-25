import { css, customElement, html, internalProperty, LitElement, TemplateResult }
	from "lit-element";
import {defaultStyles} from './defaultStyles';
import './components/FireworkA';
import { createFirework, CreateFirework1, Firework } from "./FireworkUtility";

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
	maxFireworks = 40;

	@internalProperty() fireworks1: Firework[] = [];
	@internalProperty() fireworks2: Firework[] = [];
	

	connectedCallback(): void {
		super.connectedCallback();
  	window.addEventListener('keypress', this.FIRE.bind(this));
	}


	/** Main function: Creates new firework, adds it to the screen, manages batches */
	FIRE(ev: KeyboardEvent) {
		const fireworksBatch = this.getCurrentBatch();
					
		const newFirework = createFirework(ev.key);
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
	

	renderFirework(fire: Firework): TemplateResult {
		switch (fire.type) {
			case 'Firework1': 
				return html`<firework-a .deets=${fire}></firework-a>`;
			case 'Firework2':
				return html`<firework-a .deets=${fire}></firework-a>`;
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