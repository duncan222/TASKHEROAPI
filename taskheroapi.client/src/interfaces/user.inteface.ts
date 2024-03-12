import { IUsersAccounts } from "./useraccounts.interface";
import { IUserAchievements } from "./userachievements.interface";
import { IUserFriends } from "./userfriends.interface";
import { IUserSettings } from "./usersettings.interface";
import { IUserTasks } from "./usertasks.interface";

export interface IUser {
  UserId?: number;
  Score: number;
  UserName: string;
  Image: string;
  UserSettings?: IUserSettings;
  UserAccount: IUsersAccounts;
  Friends?: IUserFriends;
  UserAchievements?: IUserAchievements;
  Tasks?: IUserTasks[];
}
