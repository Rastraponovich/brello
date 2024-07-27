import { useUnit } from "effector-react";
import { useCallback, useLayoutEffect } from "react";

import { cx } from "~/shared/lib";
import { IconButton } from "~/shared/ui/button";

import { $isFavorite, addFavoriteButtonClicked, favoriteChecked } from "./model";

export const AddToFavorite = ({ board_id }: { board_id?: string }) => {
  const isFavorite = useUnit($isFavorite);

  const [handleClick, checkFavorite] = useUnit([addFavoriteButtonClicked, favoriteChecked]);

  const handleCheckFavorite = useCallback(() => {
    if (board_id) {
      checkFavorite({ board_id });
    }
  }, [board_id, checkFavorite]);

  useLayoutEffect(() => {
    handleCheckFavorite();
  }, [handleCheckFavorite]);

  if (!board_id) {
    return null;
  }

  return (
    <IconButton
      size="sm"
      icon="shapes/star-01"
      variant="tertiaryGray"
      onClick={() => handleClick({ board_id })}
      className={cx("self-start sm:self-auto", isFavorite && "text-yellow-500")}
    />
  );
};
