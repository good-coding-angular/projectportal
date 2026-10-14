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
public class MailboxOutgoingController : Controller
{
    public IConfiguration Configuration { get; }

    public MailboxOutgoingController(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    [HttpGet("getAll")]
    [AllowAnonymous]
    public IEnumerable<MailboxOutgoingDto> GetAll()
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxOutgoings = db.MailboxOutgoing;

            var mailboxOutgoingDtos = new Collection<MailboxOutgoingDto>();

            foreach (var mailboxOutgoing in mailboxOutgoings)
            {
                mailboxOutgoingDtos.Add(
                    new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(mailboxOutgoing)
                );
            }

            return mailboxOutgoingDtos;
        }
    }

    [HttpGet("getMailboxOutgoing/{mailboxOutgoingId}")]
    [AllowAnonymous]
    public MailboxOutgoingDto GetMailboxOutgoing(string mailboxOutgoingId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxOutgoing = db.MailboxOutgoing
                .Where(mailboxOutgoing => mailboxOutgoing.MailboxOutgoingId == mailboxOutgoingId);

            return new MailboxOutgoingMapper()
                .MapMailboxOutgoingToMailboxOutgoingDto(mailboxOutgoing.First());
        }
    }

    [HttpDelete("deleteMailboxOutgoing/{mailboxOutgoingId}")]
    public ActionResult deleteMailboxOutgoing(string mailboxOutgoingId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxOutgoing = db.MailboxOutgoing
                .Where(mailboxOutgoing => mailboxOutgoing.MailboxOutgoingId == mailboxOutgoingId);

            if (mailboxOutgoing.Count() == 0)
            {
                return BadRequest();
            }

            db.MailboxOutgoing.Remove(mailboxOutgoing.First());

            db.SaveChanges();

            return Ok();
        }
    }

    [HttpPut("updateMailboxOutgoing/{mailboxOutgoingId}")]
    public ActionResult<MailboxOutgoingDto> updateMailboxOutgoing(string mailboxOutgoingId, [FromBody] MailboxOutgoingDto mailboxOutgoingDto)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxOutgoingList = db.MailboxOutgoing
                .Where(mailboxOutgoing => mailboxOutgoing.MailboxOutgoingId == mailboxOutgoingId);

            if (mailboxOutgoingList.Count() == 0)
            {
                return BadRequest();
            }

            var mailboxOutgoing = mailboxOutgoingList.First();

            mailboxOutgoing = new MailboxOutgoingMapper().UpdateMapMailboxOutgoingDtoToMailboxOutgoing(mailboxOutgoing, mailboxOutgoingDto);

            db.MailboxOutgoing.Update(mailboxOutgoing);

            db.SaveChanges();

            return new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(mailboxOutgoing);
        }
    }

    [HttpPost("createMailboxOutgoing")]
    public ActionResult<MailboxOutgoingDto> createMailboxOutgoing([FromBody] MailboxOutgoingDto? mailboxOutgoingDto)
    {
        if (mailboxOutgoingDto == null)
        {
            return BadRequest();
        }

        if (!string.IsNullOrWhiteSpace(mailboxOutgoingDto.MailboxOutgoingId))
        {
            return BadRequest("mailboxOutgoingId is set internally.");
        }

        using (var db = new ProjektportalContext(Configuration))
        {
            string mailboxOutgoingId = Guid.NewGuid().ToString();

            var newElement = new MailboxOutgoingMapper().MapMailboxOutgoingDtoToMailboxOutgoing(mailboxOutgoingDto);

            newElement.MailboxOutgoingId = mailboxOutgoingId;

            db.MailboxOutgoing.Add(newElement);

            db.SaveChanges();

            var saved = db.MailboxOutgoing.First(p => p.MailboxOutgoingId == mailboxOutgoingId);
            return Ok(new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(saved));
        }
    }
}