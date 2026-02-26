// Mock timestamps starting from UNIX epoch for easy duration calculations
export const mockTimeStamps = {
	startTime: new Date(0), // 1970-01-01T00:00:00.000Z
	endTimeOneHour: new Date(3600000), // 1 hour in milliseconds
	endTimeOneMinute: new Date(60000), // 1 minute in milliseconds
	endTimeOneSecond: new Date(1000), // 1 second in milliseconds
};

export const expectedDurations = {
	oneHour: '01:00:00',
	oneMinute: '00:01:00',
	oneSecond: '00:00:01',
};
