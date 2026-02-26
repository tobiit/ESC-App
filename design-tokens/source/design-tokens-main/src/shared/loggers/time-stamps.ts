const programStartTime = new Date();
const timeFormat = (ms: number): string => new Date(ms).toISOString().slice(11, 19);

export const getReadableTimeDuration = (startTime?: Date): string => {
	const resolvedStartTime = startTime || programStartTime;
	const endTime = new Date();
	const totalTime: number = endTime.getTime() - resolvedStartTime.getTime();
	const readableTimeDuration: string = timeFormat(totalTime);
	return readableTimeDuration;
};
