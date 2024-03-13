using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TASKHEROAPI.Server.Migrations
{
    /// <inheritdoc />
    public partial class newmigration2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "dailyTracker",
                schema: "dbo",
                table: "UserAchievements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "lastActive",
                schema: "dbo",
                table: "UserAchievements",
                type: "nvarchar(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "totalScore",
                schema: "dbo",
                table: "UserAchievements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "weeklyProgress",
                schema: "dbo",
                table: "UserAchievements",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dailyTracker",
                schema: "dbo",
                table: "UserAchievements");

            migrationBuilder.DropColumn(
                name: "lastActive",
                schema: "dbo",
                table: "UserAchievements");

            migrationBuilder.DropColumn(
                name: "totalScore",
                schema: "dbo",
                table: "UserAchievements");

            migrationBuilder.DropColumn(
                name: "weeklyProgress",
                schema: "dbo",
                table: "UserAchievements");
        }
    }
}
