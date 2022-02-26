import { Random, RandomInt } from "./Randomizer"

export type Firework = Firework1 | Firework2

/** Creates the config for a certain firework depending on key pressed */
export const CreateFirework = (key: string): Firework => {
	switch (key) {
		case 'f': case 'j':
			return createFirework1('blue')
		default:
			return createFirework2()
		}
}

/** Fire blah does this */
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
	const x = Random(0, 100);
	const drift = Random(-7.5, 7.5);
	const top = Random(60, 85, 15);
	const maxSize = Random(baseMaxSize, baseMaxSize + 200);

	// const ran =	Array.from({ length: 100 }, () => RandomInt(3,5,1))
	// console.log(ran.sort(function (a, b) {  return a - b;  }));

	return {type, x, maxSize, color, drift, top};
} 

/** Fire bloo does this */
export type Firework2 = {
	type: 'Firework2';
	x: number;
	drift: number;
	top: number;
	spores: Pos[]
}
export const createFirework2 = (): Firework2 => {
	const type = 'Firework2';
	const x = Random(0, 100);
	const drift = Random(-7.5, 7.5);
	const top = Random(75, 95, 10);
	const numberOfSpores = RandomInt(3,5,1)
	const spores =	Array.from({ length: numberOfSpores}, 
		() => ({ x: Random(-100,100), y: Random(-100,100) })
	);

	return {type, x, drift, top, spores};
} 

export type Pos = {x: number; y: number}