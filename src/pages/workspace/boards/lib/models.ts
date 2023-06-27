export type TBoard = {
  title: string;
  id: number;
  image?: string;
};

export interface IBoardCard extends TBoard {
  onClick?(): void;
}
