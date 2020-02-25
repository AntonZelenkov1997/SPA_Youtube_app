import axios from 'axios';
import API_KEY from '../models/api_key';
import actionSaveSearchQuery from './searchComponent/actions';
import { actionGetVideoStatistics, actionResetVideoStatistics} from './youtubeStatistics/actions';
import store from './store';

const asyncActionGetSearchAndStatistics = (q: string): any => {
	return async (dispatch: any) => {
		try {

			dispatch(actionResetVideoStatistics());

			const responseSearchQuery = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=12&q=${q}&key=${API_KEY}`
			);

			const parserTitle = (title: string) => {
				title = title.replace(/&#39;/g, `'`);
				title = title.replace(/&quot;/g, `"`);
				return title;
			}

			const objForAnswer = {
				q,
				totalResults: responseSearchQuery.data.pageInfo.totalResults,
				videos: responseSearchQuery.data.items.map((value: any) => ({
					videoId: value.id.videoId,
					title: parserTitle(value.snippet.title),
					channelTitle: value.snippet.channelTitle,
					img: value.snippet.thumbnails.medium.url
				}))
			};

			dispatch(actionSaveSearchQuery(objForAnswer));


      const responseStatisctics = async () => {
			try {
				let tempArrayOfStatistics: number[] = [];

				for await (const video of objForAnswer.videos) {
					const responseAxiosStat = await axios.get(
						`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video.videoId}&key=${API_KEY}`
					);
					tempArrayOfStatistics.push(Number(responseAxiosStat.data.items[0].statistics.viewCount));
				}
				return Promise.all(tempArrayOfStatistics);
			} catch (err) {
				throw err;
			}
		};
      
      let arrayOfStatistics: number[] = [];


			arrayOfStatistics = await responseStatisctics().then((response) => response);

			dispatch(actionGetVideoStatistics(arrayOfStatistics));
			return Promise.all([objForAnswer, arrayOfStatistics]);
		} catch (err) {
			throw err;
		}
	};
};











const asyncCompleteFavorites = (index: number): any => {
	const { q, order, countOfVideos } = store.getState().saveFavorites[index];

	return async (dispatch: any) => {
		try {
			dispatch(actionResetVideoStatistics());
			const responseSearchQuery = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${countOfVideos}&order=${order}&q=${q}&type=video&key=${API_KEY}`
			);

			const parserTitle = (title: string) => {
				title = title.replace(/&#39;/g, `'`);
				title = title.replace(/&quot;/g, `"`);
				return title;
			};

			const objForAnswer = {
				q,
				totalResults: responseSearchQuery.data.pageInfo.totalResults,
				videos: responseSearchQuery.data.items.map((value: any) => ({
					videoId: value.id.videoId,
					title: parserTitle(value.snippet.title),
					channelTitle: value.snippet.channelTitle,
					img: value.snippet.thumbnails.medium.url
				}))
			};

			dispatch(actionSaveSearchQuery(objForAnswer));

			const responseStatisctics = async () => {
				try {
					let tempArrayOfStatistics: number[] = [];

					for await (const video of objForAnswer.videos) {
						const responseAxiosStat = await axios.get(
							`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video.videoId}&key=${API_KEY}`
						);
						tempArrayOfStatistics.push(Number(responseAxiosStat.data.items[0].statistics.viewCount));
					}
					return Promise.all(tempArrayOfStatistics);
				} catch (err) {
					throw err;
				}
			};

			let arrayOfStatistics: number[] = [];

			arrayOfStatistics = await responseStatisctics().then((response) => response);

			dispatch(actionGetVideoStatistics(arrayOfStatistics));
			return Promise.all([objForAnswer, arrayOfStatistics]);
		} catch (err) {
			throw err;
		}
	};
};

export { asyncActionGetSearchAndStatistics, asyncCompleteFavorites };
