export interface IUserAchievements {
  UserId?: number;
  BadgeID: number;
  UnlockedAchievements: string[];
  LockedAchievements: string[];
}
