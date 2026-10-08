using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class UsersServicesNm
{
    public string UsersServicesId { get; set; }

    public string UserId { get; set; }

    public string ServiceId { get; set; }

    public virtual Users Users { get; set; }

    public virtual Services Services { get; set; }
}
