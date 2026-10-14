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
public class MailboxLabelController : Controller
{
    public IConfiguration Configuration { get; }

    public MailboxLabelController(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    [HttpGet("getAll")]
    [AllowAnonymous]
    public IEnumerable<MailboxLabelDto> GetAll()
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxLabels = db.MailboxLabel;

            var mailboxLabelDtos = new Collection<MailboxLabelDto>();

            foreach (var mailboxLabel in mailboxLabels)
            {
                mailboxLabelDtos.Add(
                    new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(mailboxLabel)
                );
            }

            return mailboxLabelDtos;
        }
    }

    [HttpGet("getMailboxLabel/{mailboxLabelId}")]
    [AllowAnonymous]
    public MailboxLabelDto GetMailboxLabel(string mailboxLabelId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxLabel = db.MailboxLabel
                .Where(mailboxLabel => mailboxLabel.MailboxLabelId == mailboxLabelId);

            return new MailboxLabelMapper()
                .MapMailboxLabelToMailboxLabelDto(mailboxLabel.First());
        }
    }

    [HttpDelete("deleteMailboxLabel/{mailboxLabelId}")]
    public ActionResult deleteMailboxLabel(string mailboxLabelId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxLabel = db.MailboxLabel
                .Where(mailboxLabel => mailboxLabel.MailboxLabelId == mailboxLabelId);

            if (mailboxLabel.Count() == 0)
            {
                return BadRequest();
            }

            db.MailboxLabel.Remove(mailboxLabel.First());

            db.SaveChanges();

            return Ok();
        }
    }

    [HttpPut("updateMailboxLabel/{mailboxLabelId}")]
    public ActionResult<MailboxLabelDto> updateMailboxLabel(string mailboxLabelId, [FromBody] MailboxLabelDto mailboxLabelDto)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var mailboxLabelList = db.MailboxLabel
                .Where(mailboxLabel => mailboxLabel.MailboxLabelId == mailboxLabelId);

            if (mailboxLabelList.Count() == 0)
            {
                return BadRequest();
            }

            var mailboxLabel = mailboxLabelList.First();

            mailboxLabel = new MailboxLabelMapper().UpdateMapMailboxLabelDtoToMailboxLabel(mailboxLabel, mailboxLabelDto);

            db.MailboxLabel.Update(mailboxLabel);

            db.SaveChanges();

            return new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(mailboxLabel);
        }
    }

    [HttpPost("createMailboxLabel")]
    public ActionResult<MailboxLabelDto> createMailboxLabel([FromBody] MailboxLabelDto? mailboxLabelDto)
    {
        if (mailboxLabelDto == null)
        {
            return BadRequest();
        }

        if (!string.IsNullOrWhiteSpace(mailboxLabelDto.MailboxLabelId))
        {
            return BadRequest("mailboxLabelId is set internally.");
        }

        using (var db = new ProjektportalContext(Configuration))
        {
            string mailboxLabelId = Guid.NewGuid().ToString();

            var newElement = new MailboxLabelMapper().MapMailboxLabelDtoToMailboxLabel(mailboxLabelDto);

            newElement.MailboxLabelId = mailboxLabelId;

            db.MailboxLabel.Add(newElement);

            db.SaveChanges();

            var saved = db.MailboxLabel.First(p => p.MailboxLabelId == mailboxLabelId);
            return Ok(new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(saved));
        }
    }
}