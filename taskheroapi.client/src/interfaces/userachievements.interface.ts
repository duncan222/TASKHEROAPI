export interface IUserAchievements {
  UserId?: number;
  BadgeID: number;
  weeklyProgress: number;
  dailyTracker: number;
  totalScore: number;
  lastActive: string;
  UnlockedAchievements: string[];
  LockedAchievements: string[];
}
