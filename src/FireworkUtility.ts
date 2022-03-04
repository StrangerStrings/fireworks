import { FireworkA, createFireworkA } from "./components/FireworkA";
import { FireworkB, createFireworkB, createFireworkB_rain } from "./components/FireworkB";
import { FireworkC, createFireworkC } from "./components/FireworkC";
import { FireworkD, createFireworkD } from "./components/FireworkD";
import { FireworkE, createFireworkE } from "./components/FireworkE";
import { FireworkF, createFireworkF } from "./components/FireworkF";
import { FireworkG, createFireworkG } from "./components/FireworkG";
import { FireworkH, createFireworkH } from "./components/FireworkH";
import { Random, RandomElement, RandomInt } from "./Randomizer"

export type Firework = FireworkA | FireworkB | FireworkC | FireworkD 
											| FireworkE | FireworkF | FireworkG | FireworkH;

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
		case 'z': 
			return createFireworkG()
		case 'x': 
			return createFireworkG('white')
		case 'h': 
			return createFireworkH()
		default:
			return createFireworkB()
		}
}

export type Pos = {x: number; y: number;}
export type PosSize = {
	x: number; y: number; size: number;
}
export type PosColor = {
	x: number; y: number; color: string;
}
export type PosSizeColor = {
	x: number; y: number; size: number; color: string;
}

type FireworkBase = {
	x: number;
	drift: number;
	top: number;
}
/** Create base properties for a rocket based firework  */
export const CreateFireworkBase = (
	avgHeight: number = 72,
	/** Vertical spread of height */
	spread: number = 12,
	hasDrift: boolean = true
): FireworkBase => {
	const x = Random(3, 97);
	const drift = hasDrift ? Random(-7.5, 7.5) : 0;

	const low = avgHeight - spread/2
	const high = avgHeight + spread/2
	const top = Random(low, high, spread);

	return {x, drift, top}
}

const getColor = (colors: string|string[]): string => {
	if (Array.isArray(colors)) {
		return RandomElement(colors)
	}
	return colors;
}

/** Create array of positions in a circle */
export const createCircularStarArray = (
	numberOfStars: number,
	radius: number,
	rotations: number = 1,
	/** Offsets radius of each consecutive star by +/- a value, giving up and down effect */
	crinkleCut: number = 0
): Pos[] => {
	const startingAngle = Random(0, 360);
	let adjustor = radius * Random(0, crinkleCut);

	return Array.from(
		{ length: numberOfStars },
		(_, idx) => {
			const angle = startingAngle + (rotations * idx * 360 / numberOfStars);
			
			const adjustedRadius = radius + adjustor;
			adjustor *= -1;

			return {
				x: trigX(adjustedRadius, angle), 
				y: trigY(adjustedRadius, angle)
			};
		}
	);
}

const trigX = (radius: number, angle: number) => {
	const radians = angle * 2 * Math.PI / 360
	return Math.cos(radians) * radius
}

const trigY = (radius: number, angle: number) => {
	const radians = angle * 2 * Math.PI / 360
	return Math.sin(radians) * radius
}


