import {
  ACTION_SAVE_FAVORITES,
  ACTION_EDIT_FAVORITES,
  ACTION_DELETE_FAVORITES,
} from './actionTypes';

const actionSaveFavorites = (value: any) => ({
  type: ACTION_SAVE_FAVORITES,
  payload: value,
});

const actionEditFavorites = (value: any, index: number) => ({
	type: ACTION_EDIT_FAVORITES,
	payload: { value, index, },
});

const actionDeleteFavorites = (index: any) => ({
	type: ACTION_DELETE_FAVORITES,
	payload: index,
});

export { actionSaveFavorites, actionEditFavorites, actionDeleteFavorites, };
