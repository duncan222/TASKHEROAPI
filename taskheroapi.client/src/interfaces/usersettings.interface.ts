export interface IUserSettings {
  UserId?: number;
  Security: {
    Discoverability: boolean;
    ScorePrivacyID: number;
    FeedPrivacyID: number;
  };
  Personalization: {
    ThemeId: number;
    AvatarId: number;
  };
}
