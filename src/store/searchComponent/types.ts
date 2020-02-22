export interface IVideos {
  videoId: string,
  title: string,
  channelTitle: string,
  img: string,
}

export interface IInitialStateSearch {
	q: string | null;
	totalResults: number | null;
	videos: Array<IVideos> | null;
}

export type actionSaveSearchQueryType = {
	type: string;
	payload: IInitialStateSearch;
};
