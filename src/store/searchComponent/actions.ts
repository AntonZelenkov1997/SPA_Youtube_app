import ACTION_SAVE_SEARCH_QUERY from './actionTypes'
import { actionSaveSearchQueryType, IInitialStateSearch } from './types';

const actionSaveSearchQuery = (queryInfo: IInitialStateSearch): actionSaveSearchQueryType => ({
	type: ACTION_SAVE_SEARCH_QUERY,
	payload: queryInfo,
});

export default actionSaveSearchQuery;
