using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class SystemStatus
{
    // Todo: Handle variable types, nullable, etc.
    public bool? Blocking { get; set; }

    public DateTime? ToDate { get; set; }

    public string? SystemStatusId { get; set; }

    public DateTime? FromDate { get; set; }

    public string? Name { get; set; }


}
