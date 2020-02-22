import {
	ACTION_SAVE_FAVORITES,
	ACTION_EDIT_FAVORITES,
	ACTION_DELETE_FAVORITES,
} from './actionTypes';

const initialState: any = [];


const saveFavoritesReducer = (state = initialState, action: any) => {
  switch (action.type) {
		case ACTION_SAVE_FAVORITES:
			return [...state, action.payload];
		case ACTION_DELETE_FAVORITES:
			state.splice(action.payload, 1);
			return state;
		case ACTION_EDIT_FAVORITES:
			state[action.payload.index] = action.payload.value;
			return state;
		default:
			return state;
  }
}

export default saveFavoritesReducer;
