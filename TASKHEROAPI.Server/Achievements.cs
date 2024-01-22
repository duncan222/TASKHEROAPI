using System.ComponentModel.DataAnnotations;

//model for the list of achievements
namespace TaskHeroAPI
{
    public class Achievements
    {
        public int Id { get; set; }

        public int LevelID { get; set;}

        public int TypeID { get; set;}

        [StringLength(50)]
        public string Name { get; set; } = string.Empty;

        public int Weight { get; set;} 

        public int IconID { get; set;} 

    }
}
