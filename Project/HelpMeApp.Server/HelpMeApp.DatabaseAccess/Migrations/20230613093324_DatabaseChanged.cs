using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HelpMeApp.DatabaseAccess.Migrations
{
    /// <inheritdoc />
    public partial class DatabaseChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 11, 33, 24, 264, DateTimeKind.Local).AddTicks(1152),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 11, 23, 44, 700, DateTimeKind.Local).AddTicks(2281));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Adverts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 11, 33, 24, 263, DateTimeKind.Local).AddTicks(4811),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 11, 23, 44, 699, DateTimeKind.Local).AddTicks(5765));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 11, 23, 44, 700, DateTimeKind.Local).AddTicks(2281),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 11, 33, 24, 264, DateTimeKind.Local).AddTicks(1152));

            migrationBuilder.AlterColumn<DateTime>(
                name: "CreationDate",
                table: "Adverts",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 6, 13, 11, 23, 44, 699, DateTimeKind.Local).AddTicks(5765),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 6, 13, 11, 33, 24, 263, DateTimeKind.Local).AddTicks(4811));
        }
    }
}
