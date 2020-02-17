import axios from 'axios';
import API_KEY from '../models/api_key';
import actionSaveSearchQuery from './searchComponent/actions';
import actionGetVideoStatistics from './youtubeStatistics/actions';

const asyncActionGetSearchAndStatistics = (q: string): any => {
	return async (dispatch: any) => {
		try {
			const responseSearchQuery = await axios.get(
				`https://www.googleapis.com/youtube/v3/search?type=video&part=snippet&maxResults=5&q=${q}&key=${API_KEY}`
			);

			const objForAnswer = {
				q,
				totalResults: responseSearchQuery.data.pageInfo.totalResults,
				videos: responseSearchQuery.data.items.map((value: any) => ({
					videoId: value.id.videoId,
					title: value.snippet.title.replace('&#39;', `'`),
					channelTitle: value.snippet.channelTitle,
					img: value.snippet.thumbnails.medium.url,
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

export default asyncActionGetSearchAndStatistics;
