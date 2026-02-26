import signale, { SignaleOptions } from 'signale';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Signale } = signale;

// Documentation for logger configuration settings: https://github.com/klaudiosinani/signale
const customLoggerOptions: SignaleOptions = {
	disabled: false,
	interactive: false,
	logLevel: 'info',
	scope: 'a1-token-builder',
	secrets: [],
	// stream: process.stdout,
	// types: {
	// 	processing: {
	// 		badge: '🛠',
	// 		color: 'blue', // https://github.com/chalk/chalk#colors
	// 		label: 'processing',
	// 		logLevel: 'info',
	// 	},
	// } as Partial<Record<TTypes, CommandType>>,
};

export const logger = new Signale(customLoggerOptions);
