import ACTION_GET_VIDEO_STATISTICS from './actionTypes';
import { actionType } from './types';

const actionGetVideoStatistics = (value: number[]): actionType => ({
	type: ACTION_GET_VIDEO_STATISTICS,
	payload: value
});

export default actionGetVideoStatistics;
