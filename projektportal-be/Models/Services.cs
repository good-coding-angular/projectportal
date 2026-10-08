using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class Services
{
    // Todo: Handle variable types, nullable, etc.
    public string? ServiceId { get; set; }

    public bool? Active { get; set; }

    public string Name { get; set; }

    public string? Url { get; set; }

    public string? Module { get; set; }

    public virtual ICollection<UsersServicesNm> UsersServicesNm { get; set; }

}
