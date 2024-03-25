import { IUsersAccounts } from "./useraccounts.interface";
import { IUserAchievements } from "./userachievements.interface";
import { IUserFollowers} from "./userfollowers.interface";
import { IUserSettings } from "./usersettings.interface";
import { IUserTasks } from "./usertasks.interface";

export interface IUser {
  UserId?: number | null;
  Score: number;
  UserName: string;
  Image: string;
  UserSettings?: IUserSettings;
  UserAccount: IUsersAccounts;
  Followers?: IUserFollowers;
  UserAchievements?: IUserAchievements;
  Tasks?: IUserTasks[];
}
