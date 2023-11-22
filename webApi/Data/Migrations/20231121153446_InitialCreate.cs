using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace webApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "artister",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Namn = table.Column<string>(type: "TEXT", nullable: true),
                    Beskrivning = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_artister", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "album",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Namn = table.Column<string>(type: "TEXT", nullable: true),
                    Publicerad = table.Column<int>(type: "INTEGER", nullable: false),
                    Artisterid = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_album", x => x.Id);
                    table.ForeignKey(
                        name: "FK_album_artister_Artisterid",
                        column: x => x.Artisterid,
                        principalTable: "artister",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "låtar",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Namn = table.Column<string>(type: "TEXT", nullable: true),
                    Placering = table.Column<int>(type: "INTEGER", nullable: false),
                    Albumid = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_låtar", x => x.Id);
                    table.ForeignKey(
                        name: "FK_låtar_album_Albumid",
                        column: x => x.Albumid,
                        principalTable: "album",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_album_Artisterid",
                table: "album",
                column: "Artisterid");

            migrationBuilder.CreateIndex(
                name: "IX_låtar_Albumid",
                table: "låtar",
                column: "Albumid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "låtar");

            migrationBuilder.DropTable(
                name: "album");

            migrationBuilder.DropTable(
                name: "artister");
        }
    }
}
