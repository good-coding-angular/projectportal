using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class Users
{
    // Todo: Handle variable types, nullable, etc.
    public string? UserId { get; set; }

    public string Name { get; set; }

    public string Password { get; set; }

    public int? Active { get; set; }

    public virtual ICollection<UsersServicesNm> UsersServicesNm { get; set; }

}
