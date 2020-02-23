import { ACTION_GET_VIDEO_STATISTICS, ACTION_RESET_VIDEO_STATISTICS } from './actionTypes';
import { actionType } from './types';

const actionGetVideoStatistics = (value: number[]): actionType => ({
	type: ACTION_GET_VIDEO_STATISTICS,
	payload: value
});

const actionResetVideoStatistics = () => ({
	type: ACTION_RESET_VIDEO_STATISTICS,
	payload: null
})

export { actionGetVideoStatistics, actionResetVideoStatistics };
