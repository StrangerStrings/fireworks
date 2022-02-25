export type Firework = Firework1 | Firework2


export const createFirework = (key: string): Firework => {
	return CreateFirework1()
}


export type Firework1 = {
	type: 'Firework1';
	x: number;
	y: number;
	maxSize: number;
	color: string;
	drift: number;
	top: number;
}

export const CreateFirework1 = (): Firework1 => {
	const type = 'Firework1'
	const x = Math.floor(Math.random()*101);
	const y = Math.floor(Math.random()*101);
	const maxSize = 200;
	const color = 'purple';
	const drift = Math.floor((Math.random()-0.5)*15);
	const top = Math.floor((Math.random())*30)+55;
	//todoo probs create random function :)

	return {type, x, y, maxSize, color, drift, top};
} 

export type Firework2 = {
	type: 'Firework2';
	x: number;
	y: number;
	maxSize: number;
	color: string;
	drift: number;
	top: number;
}
