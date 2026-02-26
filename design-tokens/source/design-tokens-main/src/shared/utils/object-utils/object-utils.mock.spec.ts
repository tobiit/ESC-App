export const simpleObject = {
	name: 'test',
	value: 42,
};

export const nestedObject = {
	level1: {
		level2: {
			value: 'nested',
		},
		sibling: {
			value: 'side',
		},
	},
};

export const sourceObject = {
	key1: { value: 'source1' },
	key2: { nested: { value: 'source2' } },
};

export const targetObject = {
	key1: { existingValue: 'target1' },
	key3: { value: 'target3' },
};

export const complexObject = {
	styles: {
		colors: {
			primary: '#000000',
			secondary: '#ffffff',
		},
		typography: {
			fontSize: '16px',
		},
	},
	settings: {
		theme: 'dark',
	},
};

export const testPropertyPath = 'styles.colors.primary';
