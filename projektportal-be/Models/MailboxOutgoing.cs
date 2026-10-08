using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class MailboxOutgoing
{
    // Todo: Handle variable types, nullable, etc.
    public string? Status { get; set; }

    public string? Files { get; set; }

    public string? MailboxOutgoingId { get; set; }

    public string? Receiver { get; set; }

    public string? Description { get; set; }

    public string? Category { get; set; }

    public string? Receipt { get; set; }

    public DateTime? Datum { get; set; }


}
