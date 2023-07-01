export type TUser = {
  firstName: string;
  lastName: string;
  image?: string;
  photo?: string;
  email?: string;
  id: number;
};

export interface IUserProps {
  item: TUser;
}
