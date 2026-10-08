namespace projektportal_be.Models.Dto;

public partial class SystemStatusDto
{
    // Todo: Handle variable types, nullable, etc.
    public bool? Blocking { get; set; }

    public DateTime? ToDate { get; set; }

    public string? SystemStatusId { get; set; }

    public DateTime? FromDate { get; set; }

    public string? Name { get; set; }

    //Todo: Handle relations
}