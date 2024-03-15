using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TASKHEROAPI.Server.Migrations
{
    /// <inheritdoc />
    public partial class changeUserSettings : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AvatarId",
                schema: "dbo",
                table: "UserSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "Discoverability",
                schema: "dbo",
                table: "UserSettings",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "FeedPrivacyID",
                schema: "dbo",
                table: "UserSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ScorePrivacyID",
                schema: "dbo",
                table: "UserSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ThemeId",
                schema: "dbo",
                table: "UserSettings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarId",
                schema: "dbo",
                table: "UserSettings");

            migrationBuilder.DropColumn(
                name: "Discoverability",
                schema: "dbo",
                table: "UserSettings");

            migrationBuilder.DropColumn(
                name: "FeedPrivacyID",
                schema: "dbo",
                table: "UserSettings");

            migrationBuilder.DropColumn(
                name: "ScorePrivacyID",
                schema: "dbo",
                table: "UserSettings");

            migrationBuilder.DropColumn(
                name: "ThemeId",
                schema: "dbo",
                table: "UserSettings");
        }
    }
}
