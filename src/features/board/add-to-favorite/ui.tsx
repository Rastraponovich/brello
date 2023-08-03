import { useUnit } from "effector-react";
import { IconButton } from "shared/ui/button";
import { addFavoriteButtonClicked } from "./model";

export const AddToFavorite = () => {
  const handleClick = useUnit(addFavoriteButtonClicked);

  return (
    <IconButton
      size="sm"
      onClick={handleClick}
      icon="shapes/star-01"
      variant="tertiaryGray"
      className="self-start sm:self-auto"
    />
  );
};
