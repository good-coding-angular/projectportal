namespace projektportal_be.Models.Dto;

public partial class ServicesDto
{
    // Todo: Handle variable types, nullable, etc.
    public string? ServiceId { get; set; }

    public bool? Active { get; set; }

    public string Name { get; set; }

    public string? Url { get; set; }

    public string? Module { get; set; }

    //Todo: Handle relations
}