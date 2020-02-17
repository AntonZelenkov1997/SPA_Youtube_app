import ACTION_SAVE_SEARCH_QUERY from "./actionTypes";
import { actionSaveSearchQueryType, IInitialStateSearch, } from './types';

const initialState: IInitialStateSearch = {
	q: null,
	totalResults: null,
	videos: null,
};

const saveSearchReducer = (state = initialState, action: actionSaveSearchQueryType): IInitialStateSearch => {
	switch (action.type) {
		case ACTION_SAVE_SEARCH_QUERY:
      return {
        ...state,
				q: action.payload.q,
				totalResults: action.payload.totalResults,
				videos: action.payload.videos,
			};
		default:
			return state;
	}
};

export default saveSearchReducer;
