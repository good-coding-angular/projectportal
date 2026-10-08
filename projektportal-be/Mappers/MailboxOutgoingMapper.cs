using System.Collections.ObjectModel;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.Mappers;

public class MailboxOutgoingMapper
{
    public MailboxOutgoingDto MapMailboxOutgoingToMailboxOutgoingDto(
        MailboxOutgoing mailboxOutgoing
    ) {
        return new MailboxOutgoingDto
        {
            Status = mailboxOutgoing.Status,
            Files = mailboxOutgoing.Files,
            MailboxOutgoingId = mailboxOutgoing.MailboxOutgoingId,
            Receiver = mailboxOutgoing.Receiver,
            Description = mailboxOutgoing.Description,
            Category = mailboxOutgoing.Category,
            Receipt = mailboxOutgoing.Receipt,
            Datum = mailboxOutgoing.Datum,
        };
    }

    public MailboxOutgoing MapMailboxOutgoingDtoToMailboxOutgoing(
        MailboxOutgoingDto mailboxOutgoing
    ) {
        return new MailboxOutgoing
        {
            Status = mailboxOutgoing.Status,
            Files = mailboxOutgoing.Files,
            MailboxOutgoingId = mailboxOutgoing.MailboxOutgoingId,
            Receiver = mailboxOutgoing.Receiver,
            Description = mailboxOutgoing.Description,
            Category = mailboxOutgoing.Category,
            Receipt = mailboxOutgoing.Receipt,
            Datum = mailboxOutgoing.Datum,
        };
    }

    public MailboxOutgoing UpdateMapMailboxOutgoingDtoToMailboxOutgoing(
        MailboxOutgoing mailboxOutgoing,
        MailboxOutgoingDto updateMailboxOutgoingDto
    ) {
        mailboxOutgoing.Status = updateMailboxOutgoingDto.Status;
        mailboxOutgoing.Files = updateMailboxOutgoingDto.Files;
        mailboxOutgoing.MailboxOutgoingId = updateMailboxOutgoingDto.MailboxOutgoingId;
        mailboxOutgoing.Receiver = updateMailboxOutgoingDto.Receiver;
        mailboxOutgoing.Description = updateMailboxOutgoingDto.Description;
        mailboxOutgoing.Category = updateMailboxOutgoingDto.Category;
        mailboxOutgoing.Receipt = updateMailboxOutgoingDto.Receipt;
        mailboxOutgoing.Datum = updateMailboxOutgoingDto.Datum;

        return mailboxOutgoing;
    }
}
