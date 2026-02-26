export const packageJsonTestData = {
	name: 'test-package',
	version: '0.3.5',
	license: 'SEE LICENSE IN LICENSE',
};

export const packageLockJsonTestData = {
	name: 'test-package',
	version: '0.3.5',
	lockfileVersion: 3,
	requires: true,
	packages: {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'': {
			name: 'test-package',
			version: '0.3.5',
			license: 'SEE LICENSE IN LICENSE',
			dependencies: {},
		},
	},
};

export const newTestVersion = '1.2.3';
