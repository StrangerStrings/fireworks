export type Firework = Firework1 | Firework2

/* Creates the config for a certain firework depending on key pressed */
export const CreateFirework = (key: string): Firework => {
	switch (key) {
		case 'f': case 'j':
			return createFirework1('blue', 190)
		default:
			return createFirework2()
		}
}

/* Fire blah does this */
export type Firework1 = {
	type: 'Firework1';
	x: number;
	maxSize: number;
	color: string;
	drift: number;
	top: number;
}
export const createFirework1 = (
	color: string = 'purple', 
	baseMaxSize: number = 80
	): Firework1 => {
		const type = 'Firework1'
		const x = Math.floor(Math.random()*101);
		const drift = Math.floor((Math.random()-0.5)*15);
		const top = Math.floor((Math.random())*30)+55;
		const maxSize = baseMaxSize + Math.random()*200
		//todoo probs create random function :)

		return {type, x, maxSize, color, drift, top};
} 

/* Fire bloo does this */
export type Firework2 = {
	type: 'Firework2';
	x: number;
	drift: number;
	top: number;
	spores: pos[]
}
export const createFirework2 = (): Firework2 => {
	const type = 'Firework2'
	const x = Math.floor(Math.random()*101);
	const drift = Math.floor((Math.random()-0.5)*5);
	const top = Math.floor((Math.random())*30)+55;

	const spores: pos[] = [
		{
			x: Math.floor((Math.random()-0.5)*200),
			y: Math.floor((Math.random()-0.5)*200)
		},
		{
			x: Math.floor((Math.random()-0.5)*200),
			y: Math.floor((Math.random()-0.5)*200)
		},
		{
			x: Math.floor((Math.random()-0.5)*200),
			y: Math.floor((Math.random()-0.5)*200)
		}
	]

	return {type, x, drift, top, spores};
} 



type pos = {x: number; y: number}