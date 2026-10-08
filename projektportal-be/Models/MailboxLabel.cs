using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class MailboxLabel
{
    // Todo: Handle variable types, nullable, etc.
    public string? MailboxLabelId { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<MailboxLabelMailboxNm> MailboxLabelMailboxNm { get; set; }

}
