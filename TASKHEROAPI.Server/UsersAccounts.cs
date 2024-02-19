using System.ComponentModel.DataAnnotations;

namespace TaskHeroAPI
{
    //model for the users account ( such as password, email, and phone) associated with UserID. 
    public class UsersAccounts
    {
        [Key] public int UserId { get; set; }

        [StringLength(20)] public string Password { get; set; } = string.Empty;

        [StringLength(40)] public string Email { get; set; } = string.Empty;


        //optional

        public int PhoneNumber { get; set; }


    }
}
