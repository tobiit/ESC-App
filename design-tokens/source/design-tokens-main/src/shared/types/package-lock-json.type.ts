export interface PackageLockJson {
	name: string;
	version: string;
	lockfileVersion: number;
	requires: boolean;
	packages: {
		[key: string]: {
			version: string;
			resolved?: string;
			integrity?: string;
			dev?: boolean;
			devOptional?: boolean;
			optional?: boolean;
			dependencies?: {
				[key: string]: string;
			};
			devDependencies?: {
				[key: string]: string;
			};
			optionalDependencies?: {
				[key: string]: string;
			};
		};
	};
	dependencies: {
		[key: string]: {
			version: string;
			resolved?: string;
			integrity?: string;
			dev?: boolean;
			devOptional?: boolean;
			optional?: boolean;
			requires?: {
				[key: string]: string;
			};
			dependencies?: {
				[key: string]: {
					version: string;
					resolved?: string;
					integrity?: string;
					dev?: boolean;
					devOptional?: boolean;
					optional?: boolean;
					requires?: {
						[key: string]: string;
					};
				};
			};
		};
	};
}
