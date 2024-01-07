import { attach, createEvent, createStore, sample } from "effector";
import { not } from "patronum";

import { $profile } from "~/entities/user";

import { api } from "~/shared/api";

const addToFavoriteFx = attach({
  effect: api.favorites.favoriteBoardCreateFx,
  source: $profile,

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  mapParams(params: { board_id: string }, { id }: { id: string }) {
    return {
      ...params,
      profile_id: id,
    };
  },
});

const favoriteRemovedFx = attach({
  effect: api.favorites.favoriteBoardDeleteFx,
  source: $profile,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  mapParams(params: { board_id: string }, { id }: { id: string }) {
    return {
      ...params,
      profile_id: id,
    };
  },
});

const favoriteBoardGetFx = attach({
  effect: api.favorites.favoriteBoardGetFx,
  source: $profile,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  mapParams(params: { board_id: string }, { id }: { id: string }) {
    return {
      ...params,
      profile_id: id,
    };
  },
});

export const favoriteChecked = createEvent<{ board_id: string }>();
export const addFavoriteButtonClicked = createEvent<{ board_id: string }>();

export const $isFavorite = createStore(false);

$isFavorite.on(favoriteRemovedFx.doneData, () => false);
$isFavorite.on(addToFavoriteFx.doneData, (_, data) => Boolean(data));
$isFavorite.on(favoriteBoardGetFx.doneData, (_, data) => Boolean(data));

sample({
  clock: addFavoriteButtonClicked,
  filter: not($isFavorite),
  target: addToFavoriteFx,
});

sample({
  clock: addFavoriteButtonClicked,
  filter: $isFavorite,
  target: favoriteRemovedFx,
});

sample({
  clock: favoriteChecked,
  target: favoriteBoardGetFx,
});
