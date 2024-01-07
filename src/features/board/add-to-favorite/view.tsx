import { useUnit } from "effector-react";
import { useLayoutEffect } from "react";

import { cx } from "~/shared/lib";
import { IconButton } from "~/shared/ui/button";

import { $isFavorite, addFavoriteButtonClicked, favoriteChecked } from "./model";

export const AddToFavorite = ({ board_id }: { board_id: string }) => {
  const [handleClick, checkFavorite] = useUnit([addFavoriteButtonClicked, favoriteChecked]);

  const isFavorite = useUnit($isFavorite);

  useLayoutEffect(() => {
    checkFavorite({ board_id });
  }, [board_id, checkFavorite]);

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
