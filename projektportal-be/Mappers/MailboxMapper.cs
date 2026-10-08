using System.Collections.ObjectModel;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.Mappers;

public class MailboxMapper
{
    public MailboxDto MapMailboxToMailboxDto(
        Mailbox mailbox
    ) {
        return new MailboxDto
        {
            Status = mailbox.Status,
            MailboxId = mailbox.MailboxId,
            Date = mailbox.Date,
            SentBy = mailbox.SentBy,
            UserId = mailbox.UserId,
            Ehp = mailbox.Ehp,
            Description = mailbox.Description,
            Files = mailbox.Files,
        };
    }

    public Mailbox MapMailboxDtoToMailbox(
        MailboxDto mailbox
    ) {
        return new Mailbox
        {
            Status = mailbox.Status,
            MailboxId = mailbox.MailboxId,
            Date = mailbox.Date,
            SentBy = mailbox.SentBy,
            UserId = mailbox.UserId,
            Ehp = mailbox.Ehp,
            Description = mailbox.Description,
            Files = mailbox.Files,
        };
    }

    public Mailbox UpdateMapMailboxDtoToMailbox(
        Mailbox mailbox,
        MailboxDto updateMailboxDto
    ) {
        mailbox.Status = updateMailboxDto.Status;
        mailbox.MailboxId = updateMailboxDto.MailboxId;
        mailbox.Date = updateMailboxDto.Date;
        mailbox.SentBy = updateMailboxDto.SentBy;
        mailbox.UserId = updateMailboxDto.UserId;
        mailbox.Ehp = updateMailboxDto.Ehp;
        mailbox.Description = updateMailboxDto.Description;
        mailbox.Files = updateMailboxDto.Files;

        return mailbox;
    }
}
