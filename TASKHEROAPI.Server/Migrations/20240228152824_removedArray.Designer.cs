﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TaskHeroAPI.Data;

#nullable disable

namespace TASKHEROAPI.Server.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240228152824_removedArray")]
    partial class removedArray
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasDefaultSchema("dbo")
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TaskHeroAPI.Achievements", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IconID")
                        .HasColumnType("int");

                    b.Property<int>("LevelID")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("TypeID")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Achievements", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Image")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<int>("Score")
                        .HasColumnType("int");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.HasKey("UserId");

                    b.ToTable("Users", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserAchievements", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("BadgeID")
                        .HasColumnType("int");

                    b.Property<string>("LockedAchievements")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UnlockedAchievements")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserAchievements", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserFriends", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("BlockedUserID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FreindsUserID")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UserFriends", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserSettings", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("UserSettings", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserTasks", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Descripcion")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("DueDate")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Importance")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("Urgency")
                        .HasColumnType("int");

                    b.Property<int>("UserId1")
                        .HasColumnType("int");

                    b.Property<int>("Weight")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.HasIndex("UserId1");

                    b.ToTable("UserTasks", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UsersAccounts", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(40)
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("UsersAccounts", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserAchievements", b =>
                {
                    b.HasOne("TaskHeroAPI.User", null)
                        .WithOne("Achievements")
                        .HasForeignKey("TaskHeroAPI.UserAchievements", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaskHeroAPI.UserFriends", b =>
                {
                    b.HasOne("TaskHeroAPI.User", null)
                        .WithOne("Friends")
                        .HasForeignKey("TaskHeroAPI.UserFriends", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaskHeroAPI.UserSettings", b =>
                {
                    b.HasOne("TaskHeroAPI.User", null)
                        .WithOne("UserSettings")
                        .HasForeignKey("TaskHeroAPI.UserSettings", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaskHeroAPI.UserTasks", b =>
                {
                    b.HasOne("TaskHeroAPI.User", null)
                        .WithMany("Tasks")
                        .HasForeignKey("UserId1")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaskHeroAPI.UsersAccounts", b =>
                {
                    b.HasOne("TaskHeroAPI.User", null)
                        .WithOne("UserAccount")
                        .HasForeignKey("TaskHeroAPI.UsersAccounts", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("TaskHeroAPI.User", b =>
                {
                    b.Navigation("Achievements");

                    b.Navigation("Friends");

                    b.Navigation("Tasks");

                    b.Navigation("UserAccount");

                    b.Navigation("UserSettings");
                });
#pragma warning restore 612, 618
        }
    }
}
