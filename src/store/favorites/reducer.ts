import ACTION_SAVE_FAVORITES from "./actionTypes"

const initialState = [
	{
		q: null,
		name: null,
		order: null,
		countOfVideos: null,
		videos: null,
		statistics: null
	},
];


const saveFavoritesReducer = (state = initialState, action: any) => {
  switch (action.type) {
		case ACTION_SAVE_FAVORITES:
			return [...state, action.payload]
		default:
			return state;
  }
}

export default saveFavoritesReducer;
