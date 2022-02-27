import { Random, RandomInt } from "./Randomizer"

export type Firework = Firework1 | Firework2 | Firework3

/** Creates the config for a certain firework depending on key pressed */
export const CreateFirework = (key: string): Firework => {
	switch (key) {
		case 'f': case 'j':
			return createFirework1()
		case 'q': case 'w':
			return createFirework2_rain()
		case 'a': case 's':
			return createFirework3()
		case 'd':
			return createFirework3()
		default:
			return createFirework2()
		}
}

export type Pos = {x: number; y: number}

type FireworkBase = {
	x: number;
	drift: number;
	top: number;
}
const CreateFireworkBase = (
	//add some basics params
): FireworkBase => {
	const x = Random(3, 97);
	const drift = Random(-7.5, 7.5);
	const top = Random(60, 85, 15);

	return {x, drift, top}
}

/** Fire blah does this */
export type Firework1 = {
	type: 'Firework1';
	x: number;
	drift: number;
	top: number;
	maxSize: number;
	color: string;
}
export const createFirework1 = (
	color: string = 'purple', 
	baseMaxSize: number = 80
): Firework1 => {
	const type = 'Firework1';
	const base = CreateFireworkBase()

	const maxSize = Random(baseMaxSize, baseMaxSize + 100);

	// const ran =	Array.from({ length: 100 }, () => RandomInt(3,5,1))
	// console.log(ran.sort(function (a, b) {  return a - b;  }));
	return {type, ...base, maxSize, color};
} 

/** Fire bloo does this */
export type Firework2 = {
	type: 'Firework2';
	x: number;
	drift: number;
	top: number;
	sporeSize: number;
	spores: Pos[]
}
export const createFirework2 = (): Firework2 => {
	const type = 'Firework2';

	const x = Random(3, 97);
	const drift = Random(-7.5, 7.5);
	const top = Random(75, 95, 10);

	const sporeSize = 25
	const numberOfSpores = RandomInt(3,5,1);
	const spores =	Array.from({ length: numberOfSpores}, 
		() => ({ x: Random(-100,100), y: Random(-100,100) })
	);

	return {type, x, drift, top, sporeSize, spores};
} 

export const createFirework2_rain = (): Firework2 => {
	const type = 'Firework2';

	const x = Random(0, 100);
	const drift = Random(-5, 5);
	const top = Random(75, 95, 10);

	const sporeSize = 10
	const numberOfSpores = RandomInt(8,20);
	const spores =	Array.from({ length: numberOfSpores}, 
		() => ({ x: Random(-100,100), y: Random(-250,-50) })
	);

	return {type, x, drift, top, sporeSize, spores};
} 


/** Fire blah does this */
export type Firework3 = {
	type: 'Firework3';
	x: number;
	drift: number;
	top: number;
	maxSize: number;
	color: string;
}
export const createFirework3 = (
	color: string = '#be6900', 
	baseMaxSize: number = 50
): Firework3 => {
	const type = 'Firework3';
	const base = CreateFireworkBase()

	const maxSize = Random(baseMaxSize, baseMaxSize + 100);

	return {type, ...base, maxSize, color};
} 
