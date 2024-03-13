using Microsoft.EntityFrameworkCore.Migrations;
using System.Threading.Tasks;

#nullable disable

namespace TASKHEROAPI.Server.Migrations
{
    /// <inheritdoc />
    public partial class newmigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
            name: "UserTasks",
            schema: "dbo",
            columns: table => new
            {
                TaskId = table.Column<int>(type: "int", nullable: false)
                    .Annotation("SqlServer:Identity", "1, 1"),
                UserId = table.Column<int>(type: "int", nullable: false),
                Descripcion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                Title = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                timeStamp = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                DueDate = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                Importance = table.Column<int>(type: "int", nullable: false),
                Weight = table.Column<int>(type: "int", nullable: false),
                Urgency = table.Column<int>(type: "int", nullable: false)            },
            constraints: table =>
            {
                table.PrimaryKey("PK_UserTasks", x => x.TaskId);
                table.ForeignKey(
                    name: "FK_UserTasks_Users_UserId",
                    column: x => x.UserId,
                    principalSchema: "dbo",
                    principalTable: "Users",
                    principalColumn: "UserId",
                    onDelete: ReferentialAction.Cascade);
            });

   
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserTasks",
                schema: "dbo");
        }
    }
}
