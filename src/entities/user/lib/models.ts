export type TUser = {
  firstName: string;
  lastName: string;
  image?: string;
  email?: string;
};

export interface IUserProps {
  item: TUser;
}
