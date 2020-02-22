import { connect } from 'react-redux';
import { IInitialStateSearch } from './searchComponent/types';
import actionSaveSearchQuery from "./searchComponent/actions";
import { IInitialStateStatistics } from './youtubeStatistics/types';
import actionGetVideoStatistics from './youtubeStatistics/actions';
import { actionSaveFavorites, actionDeleteFavorites, actionEditFavorites } from './favorites/actions';

interface IState {
  saveSearch: IInitialStateSearch,
	getVideoStatistics: IInitialStateStatistics,
	saveFavorites: any,
};

const mapStateToProps = (state: IState): IInitialStateSearch & IInitialStateStatistics & any => ({
	q: state.saveSearch.q,
	totalResults: state.saveSearch.totalResults,
	videos: state.saveSearch.videos,
	statistics: state.getVideoStatistics.statistics,
	favorites: state.saveFavorites,
});

const mapDispatchToProps: any = {
	actionSaveSearchQuery,
	actionGetVideoStatistics,
	actionSaveFavorites,
	actionEditFavorites,
	actionDeleteFavorites,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector;
