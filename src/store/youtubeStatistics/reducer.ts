import { ACTION_GET_VIDEO_STATISTICS, ACTION_RESET_VIDEO_STATISTICS } from './actionTypes';
import { IInitialStateStatistics } from './types';
import { actionType } from './types';

const initialState: IInitialStateStatistics = {
	statistics: null,
};

const getVideoStatisticsReducer = (state = initialState, action: actionType): IInitialStateStatistics => {
	switch (action.type) {
		case ACTION_GET_VIDEO_STATISTICS:
			return { ...state, statistics: action.payload };
		case ACTION_RESET_VIDEO_STATISTICS:
			return { ...state, statistics: action.payload }
		default:
			return state;
	}
};

export default getVideoStatisticsReducer;
