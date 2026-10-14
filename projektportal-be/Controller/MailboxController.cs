using System.Collections.ObjectModel;
using projektportal_be;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace projektportal_be.Controllers;

[ApiController]
[Route(Endpoints.ApiPrefix + "[controller]")]
[Authorize]
public class MailboxController : Controller
{
    public IConfiguration Configuration { get; }

    public MailboxController(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    [HttpGet("getAll")]
    [AllowAnonymous]
    public IEnumerable<MailboxDto> GetAll()
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxs = db.Mailbox;

            var mailboxDtos = new Collection<MailboxDto>();

            foreach (var mailbox in mailboxs)
            {
                mailboxDtos.Add(
                    new MailboxMapper().MapMailboxToMailboxDto(mailbox)
                );
            }

            return mailboxDtos;
        }
    }

    [HttpGet("getMailbox/{mailboxId}")]
    [AllowAnonymous]
    public MailboxDto GetMailbox(string mailboxId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailbox = db.Mailbox
                .Where(mailbox => mailbox.MailboxId == mailboxId);

            return new MailboxMapper()
                .MapMailboxToMailboxDto(mailbox.First());
        }
    }

    [HttpDelete("deleteMailbox/{mailboxId}")]
    public ActionResult deleteMailbox(string mailboxId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailbox = db.Mailbox
                .Where(mailbox => mailbox.MailboxId == mailboxId);

            if (mailbox.Count() == 0)
            {
                return BadRequest();
            }

            db.Mailbox.Remove(mailbox.First());

            db.SaveChanges();

            return Ok();
        }
    }

    [HttpPut("updateMailbox/{mailboxId}")]
    public ActionResult<MailboxDto> updateMailbox(string mailboxId, [FromBody] MailboxDto mailboxDto)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxList = db.Mailbox
                .Where(mailbox => mailbox.MailboxId == mailboxId);

            if (mailboxList.Count() == 0)
            {
                return BadRequest();
            }

            var mailbox = mailboxList.First();

            mailbox = new MailboxMapper().UpdateMapMailboxDtoToMailbox(mailbox, mailboxDto);

            db.Mailbox.Update(mailbox);

            db.SaveChanges();

            return new MailboxMapper().MapMailboxToMailboxDto(mailbox);
        }
    }

    [HttpPost("createMailbox")]
    public ActionResult<MailboxDto> createMailbox([FromBody] MailboxDto? mailboxDto)
    {
        if (mailboxDto == null)
        {
            return BadRequest();
        }

        if (!string.IsNullOrWhiteSpace(mailboxDto.MailboxId))
        {
            return BadRequest("mailboxId is set internally.");
        }

        using (var db = new ProjektportalContext(Configuration))
        {
            string mailboxId = Guid.NewGuid().ToString();

            var newElement = new MailboxMapper().MapMailboxDtoToMailbox(mailboxDto);

            newElement.MailboxId = mailboxId;

            db.Mailbox.Add(newElement);

            db.SaveChanges();

            var saved = db.Mailbox.First(p => p.MailboxId == mailboxId);
            return Ok(new MailboxMapper().MapMailboxToMailboxDto(saved));
        }
    }
}