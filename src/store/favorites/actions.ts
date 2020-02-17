import ACTION_SAVE_FAVORITES from "./actionTypes"

const actionSaveFavorites = (value: any) => ({
  type: ACTION_SAVE_FAVORITES,
  payload: value,
});

export default actionSaveFavorites;
