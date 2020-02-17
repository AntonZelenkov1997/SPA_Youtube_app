import { combineReducers } from 'redux';
import saveSearchReducer from "./searchComponent/reducer";
import getVideoStatisticsReducer from './youtubeStatistics/reducer';
import saveFavoritesReducer from './favorites/reducer';

const allReducers = combineReducers({
	saveSearch: saveSearchReducer,
	getVideoStatistics: getVideoStatisticsReducer,
	saveFavorites: saveFavoritesReducer,
});

export default allReducers;
