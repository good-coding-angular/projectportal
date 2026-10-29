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

    [McpServerTool(Name = "mailbox_get_all"), Description("Retrieve all mailbox entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new MailboxMapper();
        var result = db.Mailbox.ToList().Select(m => mapper.MapMailboxToMailboxDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "mailbox_get"), Description("Retrieve a single mailbox entry by ID")]
    public string Get([Description("The mailbox ID")] string mailboxId)
    {
        using var db = new ProjektportalContext(_config);
        var mailbox = db.Mailbox.FirstOrDefault(m => m.MailboxId == mailboxId);
        if (mailbox == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new MailboxMapper().MapMailboxToMailboxDto(mailbox));
    }

    [McpServerTool(Name = "mailbox_create"), Description("Create a new mailbox entry")]
    public string Create(
        [Description("Status of the mailbox entry")] string? status,
        [Description("Date in ISO 8601 format (e.g. 2025-01-15T10:00:00)")] string? date,
        [Description("Who sent this entry")] string? sentBy,
        [Description("User ID associated with this entry")] string? userId,
        [Description("EHP value")] string? ehp,
        [Description("Description of the mailbox entry")] string? description,
        [Description("File references")] string? files)
    {
        using var db = new ProjektportalContext(_config);
        var dto = new MailboxDto
        {
            Status = status,
            Date = date != null ? DateTime.Parse(date) : null,
            SentBy = sentBy,
            UserId = userId,
            Ehp = ehp,
            Description = description,
            Files = files,
        };
        var entity = new MailboxMapper().MapMailboxDtoToMailbox(dto);
        entity.MailboxId = Guid.NewGuid().ToString();
        db.Mailbox.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxMapper().MapMailboxToMailboxDto(entity));
    }

    [McpServerTool(Name = "mailbox_update"), Description("Update an existing mailbox entry")]
    public string Update(
        [Description("The ID of the mailbox entry to update")] string mailboxId,
        [Description("Status")] string? status,
        [Description("Date in ISO 8601 format")] string? date,
        [Description("Who sent this entry")] string? sentBy,
        [Description("User ID")] string? userId,
        [Description("EHP value")] string? ehp,
        [Description("Description")] string? description,
        [Description("File references")] string? files)
    {
        using var db = new ProjektportalContext(_config);
        var mailbox = db.Mailbox.FirstOrDefault(m => m.MailboxId == mailboxId);
        if (mailbox == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new MailboxDto
        {
            MailboxId = mailboxId,
            Status = status,
            Date = date != null ? DateTime.Parse(date) : null,
            SentBy = sentBy,
            UserId = userId,
            Ehp = ehp,
            Description = description,
            Files = files,
        };
        mailbox = new MailboxMapper().UpdateMapMailboxDtoToMailbox(mailbox, dto);
        db.Mailbox.Update(mailbox);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxMapper().MapMailboxToMailboxDto(mailbox));
    }

    [McpServerTool(Name = "mailbox_delete"), Description("Delete a mailbox entry by ID")]
    public string Delete([Description("The ID of the mailbox entry to delete")] string mailboxId)
    {
        using var db = new ProjektportalContext(_config);
        var mailbox = db.Mailbox.FirstOrDefault(m => m.MailboxId == mailboxId);
        if (mailbox == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.Mailbox.Remove(mailbox);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = mailboxId });
    }
}
