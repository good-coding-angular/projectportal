using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Server;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.McpTools;

[McpServerToolType]
public class MailboxMcpTools
{
    private readonly IConfiguration _config;

    public MailboxMcpTools(IConfiguration config)
    {
        _config = config;
    }

    [McpServerTool(Name = "mailbox_get_all"), Description("Retrieve all Mailbox entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new MailboxMapper();
        var result = db.Mailbox.ToList().Select(m => mapper.MapMailboxToMailboxDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "mailbox_get"), Description("Retrieve a single Mailbox entry by ID")]
    public string Get([Description("The Mailbox ID")] string mailboxId)
    {
        using var db = new ProjektportalContext(_config);
        var MailboxId = db.Mailbox.FirstOrDefault(m => m.MailboxId == mailboxId);
        if (MailboxId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new MailboxMapper().MapMailboxToMailboxDto(MailboxId));
    }

    [McpServerTool(Name = "mailbox_create"), Description("Create a new Mailbox")]
    public string Create(
        [Description("status")] string? status,
        [Description("date")] DateTime? date,
        [Description("sentBy")] string? sentBy,
        [Description("userId")] string? userId,
        [Description("ehp")] string? ehp,
        [Description("description")] string? description,
        [Description("files")] string? files
    )
    {
        using var db = new ProjektportalContext(_config);
        var dto = new MailboxDto {
            Status = status,
            Date = date,
            SentBy = sentBy,
            UserId = userId,
            Ehp = ehp,
            Description = description,
            Files = files
        };
        var entity = new MailboxMapper().MapMailboxDtoToMailbox(dto);
        entity.MailboxId = Guid.NewGuid().ToString();
        db.Mailbox.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxMapper().MapMailboxToMailboxDto(entity));
    }

    [McpServerTool(Name = "mailbox_update"), Description("Update an existing Mailbox")]
    public string Update(
        [Description("status")] string? status,
        [Description("The mailboxId of the Mailbox to update")] string? mailboxId,
        [Description("date")] DateTime? date,
        [Description("sentBy")] string? sentBy,
        [Description("userId")] string? userId,
        [Description("ehp")] string? ehp,
        [Description("description")] string? description,
        [Description("files")] string? files
    )
    {
        using var db = new ProjektportalContext(_config);
        var MailboxId = db.Mailbox.FirstOrDefault(m => m.MailboxId == mailboxId);
        if (MailboxId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new MailboxDto {
            Status = status,
            MailboxId = mailboxId,
            Date = date,
            SentBy = sentBy,
            UserId = userId,
            Ehp = ehp,
            Description = description,
            Files = files
        };
        MailboxId = new MailboxMapper().UpdateMapMailboxDtoToMailbox(MailboxId, dto);
        db.Mailbox.Update(MailboxId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxMapper().MapMailboxToMailboxDto(MailboxId));
    }

    [McpServerTool(Name = "mailbox_delete"), Description("Delete a Mailbox by ID")]
    public string Delete([Description("The ID of the Mailbox to delete")] string mailboxId)
    {
        using var db = new ProjektportalContext(_config);
        var MailboxId = db.Mailbox.FirstOrDefault(m => m.MailboxId == mailboxId);
        if (MailboxId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.Mailbox.Remove(MailboxId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = mailboxId });
    }
}
