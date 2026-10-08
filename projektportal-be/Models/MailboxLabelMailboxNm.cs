using System;
using System.Collections.Generic;

namespace projektportal_be.Models;

public partial class MailboxLabelMailboxNm
{
    public string MailboxLabelMailboxId { get; set; }

    public string MailboxLabelId { get; set; }

    public string MailboxId { get; set; }

    public virtual MailboxLabel MailboxLabel { get; set; }

    public virtual Mailbox Mailbox { get; set; }
}
