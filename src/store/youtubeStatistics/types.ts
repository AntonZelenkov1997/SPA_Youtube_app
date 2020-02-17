export type actionType = {
	type: string;
	payload: number[];
};

export interface IInitialStateStatistics {
	statistics: number[] | null;
};
