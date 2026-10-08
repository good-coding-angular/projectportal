namespace projektportal_be.Models.Dto;

public partial class UsersDto
{
    // Todo: Handle variable types, nullable, etc.
    public string? UserId { get; set; }

    public string Name { get; set; }

    public string Password { get; set; }

    public int? Active { get; set; }

    //Todo: Handle relations
}