using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TASKHEROAPI.Server.Migrations
{
    /// <inheritdoc />
    public partial class namechangeDescription : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "dbo",
                table: "UserTasks",
                newName: "Description");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Description",
                schema: "dbo",
                table: "UserTasks",
                newName: "Descripcion");
        }
    }
}
