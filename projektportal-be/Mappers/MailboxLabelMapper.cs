using System.Collections.ObjectModel;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.Mappers;

public class MailboxLabelMapper
{
    public MailboxLabelDto MapMailboxLabelToMailboxLabelDto(
        MailboxLabel mailboxLabel
    ) {
        return new MailboxLabelDto
        {
            MailboxLabelId = mailboxLabel.MailboxLabelId,
            Name = mailboxLabel.Name,
        };
    }

    public MailboxLabel MapMailboxLabelDtoToMailboxLabel(
        MailboxLabelDto mailboxLabel
    ) {
        return new MailboxLabel
        {
            MailboxLabelId = mailboxLabel.MailboxLabelId,
            Name = mailboxLabel.Name,
        };
    }

    public MailboxLabel UpdateMapMailboxLabelDtoToMailboxLabel(
        MailboxLabel mailboxLabel,
        MailboxLabelDto updateMailboxLabelDto
    ) {
        mailboxLabel.MailboxLabelId = updateMailboxLabelDto.MailboxLabelId;
        mailboxLabel.Name = updateMailboxLabelDto.Name;

        return mailboxLabel;
    }
}
