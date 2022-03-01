import { Random, RandomInt } from "./Randomizer"

export type Firework = FireworkA | FireworkB | FireworkC 
										  | FireworkD | FireworkE | FireworkF;

/** Creates the config for a certain firework depending on key pressed */
export const CreateFirework = (key: string): Firework => {
	switch (key) {
		case 'f': case 'j':
			return createFireworkA()
		case 'q': case 'w':
			return createFireworkB_rain()
		case 'a': case 's': case 'd':
			return createFireworkC()

		case 'c': 
			return createFireworkD()
		case 'v': 
			return createFireworkD('#be5afa')
		case 'b':
			return createFireworkD('#cfb827')
			
		case 'g': case '[':
			return createFireworkE()
		case ';': 
			return createFireworkF()
		default:
			return createFireworkB()
		}
}

export type Pos = {x: number; y: number}

type FireworkBase = {
	x: number;
	drift: number;
	top: number;
}
const CreateFireworkBase = (
	avgHeight: number = 72,
	spread: number = 12
): FireworkBase => {
	const x = Random(3, 97);
	const drift = Random(-7.5, 7.5);

	const low = avgHeight - spread/2
	const high = avgHeight + spread/2
	const top = Random(low, high, spread);

	return {x, drift, top}
}

/** Fire blah does this */
export type FireworkA = {
	type: 'FireworkA';
	x: number;
	drift: number;
	top: number;
	maxSize: number;
	color: string;
}
export const createFireworkA = (
	color: string = 'purple', 
	baseMaxSize: number = 80
): FireworkA => {
	const type = 'FireworkA';

	const base = CreateFireworkBase()

	const maxSize = Random(baseMaxSize, baseMaxSize + 100);

	// const ran =	Array.from({ length: 100 }, () => RandomInt(3,5,1))
	// console.log(ran.sort(function (a, b) {  return a - b;  }));
	return {type, ...base, maxSize, color};
} 

/** Fire bloo does this */
export type FireworkB = {
	type: 'FireworkB';
	x: number;
	drift: number;
	top: number;
	sporeSize: number;
	spores: Pos[]
}
export const createFireworkB = (): FireworkB => {
	const type = 'FireworkB';

	const base = CreateFireworkBase(85, 10)

	const sporeSize = Random(20,30)
	const numberOfSpores = RandomInt(3,5,1);
	const spores =	Array.from({ length: numberOfSpores}, 
		() => ({ x: Random(-100,100), y: Random(-100,100) })
	);

	return {type, ...base, sporeSize, spores};
} 

export const createFireworkB_rain = (): FireworkB => {
	const type = 'FireworkB';

	const base = CreateFireworkBase(85, 10)

	const sporeSize = 7
	const numberOfSpores = RandomInt(8,20);
	const spores =	Array.from(
		{ length: numberOfSpores }, 
		() => ({ x: Random(-200,200), y: Random(-130,-30) })
	);

	return {type, ...base, sporeSize, spores};
} 


/** Fire blah does this */
export type FireworkC = {
	type: 'FireworkC';
	x: number;
	drift: number;
	top: number;
	maxSize: number;
	color: string;
}
export const createFireworkC = (
	color: string = '#be6900', 
	baseMaxSize: number = 50
): FireworkC => {
	const type = 'FireworkC';
	const base = CreateFireworkBase()

	const maxSize = Random(baseMaxSize, baseMaxSize + 100);

	return {type, ...base, maxSize, color};
} 


/** Fire blah does this */
export type FireworkD = {
	type: 'FireworkD';
	x: number;
	sporeSize: number;
	spores: Pos[];
	color: string;
}
export const createFireworkD = (
	color: string = '#78def2'
): FireworkD => {
	const type = 'FireworkD';

	const x = Random(3, 97);

	const sporeSize = Random(10,15)
	const numberOfSpores = RandomInt(20,30);
	const maxHeight = Random(150,300)
	const spores =	Array.from(
		{ length: numberOfSpores },
		() => ({ x: Random(-100,100), y: Random(50,maxHeight,50) })
	);

	return {type, x, sporeSize, spores, color};
} 


/** Fire blah does this */
export type FireworkE = {
	type: 'FireworkE';
	x: number;
	drift: number;
	top: number;
	flashSize: number;
	color: string;
}
export const createFireworkE = (
	color: string = '#be5afa'
): FireworkE => {
	const type = 'FireworkE';

	const base = CreateFireworkBase(90, 15)

	const flashSize = Random(500,1000,300)

	return {type, ...base, flashSize, color};
}
 

/** Fire bloo does this */
export type FireworkF = {
	type: 'FireworkF';
	x: number;
	drift: number;
	top: number;
	sporeSize: number;
	spores: Pos[]
}
export const createFireworkF = (): FireworkF => {
	const type = 'FireworkF';

	const base = CreateFireworkBase(65, 20)

	const sporeSize = Random(15,25)
	const numberOfSpores = RandomInt(50,150);
	const spores =	Array.from({ length: numberOfSpores}, 
		() => ({ x: Random(-100,100,100), y: Random(-100,100,30) })
	);

	return {type, ...base, sporeSize, spores};
} 
