using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Server;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.McpTools;

[McpServerToolType]
public class MailboxOutgoingMcpTools
{
    private readonly IConfiguration _config;

    public MailboxOutgoingMcpTools(IConfiguration config)
    {
        _config = config;
    }

    [McpServerTool(Name = "mailbox_outgoing_get_all"), Description("Retrieve all outgoing mailbox entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new MailboxOutgoingMapper();
        var result = db.MailboxOutgoing.ToList().Select(m => mapper.MapMailboxOutgoingToMailboxOutgoingDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "mailbox_outgoing_get"), Description("Retrieve a single outgoing mailbox entry by ID")]
    public string Get([Description("The outgoing mailbox ID")] string mailboxOutgoingId)
    {
        using var db = new ProjektportalContext(_config);
        var item = db.MailboxOutgoing.FirstOrDefault(m => m.MailboxOutgoingId == mailboxOutgoingId);
        if (item == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(item));
    }

    [McpServerTool(Name = "mailbox_outgoing_create"), Description("Create a new outgoing mailbox entry")]
    public string Create(
        [Description("Status of the outgoing entry")] string? status,
        [Description("File references")] string? files,
        [Description("Receiver of the outgoing message")] string? receiver,
        [Description("Description")] string? description,
        [Description("Category")] string? category,
        [Description("Receipt reference")] string? receipt,
        [Description("Date in ISO 8601 format (e.g. 2025-01-15T10:00:00)")] string? datum)
    {
        using var db = new ProjektportalContext(_config);
        var dto = new MailboxOutgoingDto
        {
            Status = status,
            Files = files,
            Receiver = receiver,
            Description = description,
            Category = category,
            Receipt = receipt,
            Datum = datum != null ? DateTime.Parse(datum) : null,
        };
        var entity = new MailboxOutgoingMapper().MapMailboxOutgoingDtoToMailboxOutgoing(dto);
        entity.MailboxOutgoingId = Guid.NewGuid().ToString();
        db.MailboxOutgoing.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(entity));
    }

    [McpServerTool(Name = "mailbox_outgoing_update"), Description("Update an existing outgoing mailbox entry")]
    public string Update(
        [Description("The ID of the outgoing mailbox entry to update")] string mailboxOutgoingId,
        [Description("Status")] string? status,
        [Description("File references")] string? files,
        [Description("Receiver")] string? receiver,
        [Description("Description")] string? description,
        [Description("Category")] string? category,
        [Description("Receipt reference")] string? receipt,
        [Description("Date in ISO 8601 format")] string? datum)
    {
        using var db = new ProjektportalContext(_config);
        var item = db.MailboxOutgoing.FirstOrDefault(m => m.MailboxOutgoingId == mailboxOutgoingId);
        if (item == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new MailboxOutgoingDto
        {
            MailboxOutgoingId = mailboxOutgoingId,
            Status = status,
            Files = files,
            Receiver = receiver,
            Description = description,
            Category = category,
            Receipt = receipt,
            Datum = datum != null ? DateTime.Parse(datum) : null,
        };
        item = new MailboxOutgoingMapper().UpdateMapMailboxOutgoingDtoToMailboxOutgoing(item, dto);
        db.MailboxOutgoing.Update(item);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(item));
    }

    [McpServerTool(Name = "mailbox_outgoing_delete"), Description("Delete an outgoing mailbox entry by ID")]
    public string Delete([Description("The ID of the outgoing mailbox entry to delete")] string mailboxOutgoingId)
    {
        using var db = new ProjektportalContext(_config);
        var item = db.MailboxOutgoing.FirstOrDefault(m => m.MailboxOutgoingId == mailboxOutgoingId);
        if (item == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.MailboxOutgoing.Remove(item);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = mailboxOutgoingId });
    }
}
