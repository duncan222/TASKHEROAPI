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
    [Migration("20240326043601_sizeChange")]
    partial class sizeChange
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

                    b.Property<int>("dailyTracker")
                        .HasColumnType("int");

                    b.Property<string>("lastActive")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("totalScore")
                        .HasColumnType("int");

                    b.Property<int>("weeklyProgress")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("UserAchievements", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserFollows", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("FollowerId")
                        .HasColumnType("int");

                    b.Property<int>("FollowingId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FollowerId");

                    b.HasIndex("FollowingId");

                    b.ToTable("UserFollows", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserSettings", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<int>("AvatarId")
                        .HasColumnType("int");

                    b.Property<bool>("Discoverability")
                        .HasColumnType("bit");

                    b.Property<int>("FeedPrivacyID")
                        .HasColumnType("int");

                    b.Property<int>("ScorePrivacyID")
                        .HasColumnType("int");

                    b.Property<int>("ThemeId")
                        .HasColumnType("int");

                    b.HasKey("UserId");

                    b.ToTable("UserSettings", "dbo");
                });

            modelBuilder.Entity("TaskHeroAPI.UserTasks", b =>
                {
                    b.Property<int>("TaskId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TaskId"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("DueDate")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<int>("Importance")
                        .HasColumnType("int");

                    b.Property<string>("TimeStamp")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<double>("Urgency")
                        .HasColumnType("float");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.Property<double>("Weight")
                        .HasColumnType("float");

                    b.HasKey("TaskId");

                    b.HasIndex("UserId");

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

            modelBuilder.Entity("TaskHeroAPI.UserFollows", b =>
                {
                    b.HasOne("TaskHeroAPI.User", "Follower")
                        .WithMany()
                        .HasForeignKey("FollowerId")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.HasOne("TaskHeroAPI.User", "Following")
                        .WithMany()
                        .HasForeignKey("FollowingId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Follower");

                    b.Navigation("Following");
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
                        .HasForeignKey("UserId")
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

                    b.Navigation("Tasks");

                    b.Navigation("UserAccount");

                    b.Navigation("UserSettings");
                });
#pragma warning restore 612, 618
        }
    }
}
