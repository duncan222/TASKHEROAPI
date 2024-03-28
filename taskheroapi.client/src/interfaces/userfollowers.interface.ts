import { IUser } from "./user.inteface";

export interface IUserFollowers {
  id: number;
  followerId: number;
  follower: IUser | null;
  followingId: number;
  following: IUser | null;
}
