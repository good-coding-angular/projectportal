using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class Mailbox
{
    // Todo: Handle variable types, nullable, etc.
    public string? Status { get; set; }

    public string? MailboxId { get; set; }

    public DateTime? Date { get; set; }

    public string? SentBy { get; set; }

    public string? UserId { get; set; }

    public string? Ehp { get; set; }

    public string? Description { get; set; }

    public string? Files { get; set; }

    public virtual ICollection<MailboxLabelMailboxNm> MailboxLabelMailboxNm { get; set; }

}
