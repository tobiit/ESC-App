export const mockErrorMessages = {
	general: 'A general error occurred',
	withContext: 'A logical token set error occurred',
};

export const mockError = new Error('Original error');

export const mockDebugContext = ['Debug context line 1', 'Debug context line 2', 'Additional debug information'];

// Mock console.log for horizontal divider test
export const originalConsoleLog = console.log;
