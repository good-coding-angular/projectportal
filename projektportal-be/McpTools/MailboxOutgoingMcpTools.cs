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

    [McpServerTool(Name = "mailboxOutgoing_get_all"), Description("Retrieve all MailboxOutgoing entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new MailboxOutgoingMapper();
        var result = db.MailboxOutgoing.ToList().Select(m => mapper.MapMailboxOutgoingToMailboxOutgoingDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "mailboxOutgoing_get"), Description("Retrieve a single MailboxOutgoing entry by ID")]
    public string Get([Description("The MailboxOutgoing ID")] string mailboxOutgoingId)
    {
        using var db = new ProjektportalContext(_config);
        var MailboxOutgoingId = db.MailboxOutgoing.FirstOrDefault(m => m.MailboxOutgoingId == mailboxOutgoingId);
        if (MailboxOutgoingId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(MailboxOutgoingId));
    }

    [McpServerTool(Name = "mailboxOutgoing_create"), Description("Create a new MailboxOutgoing")]
    public string Create(
        [Description("status")] string? status,
        [Description("files")] string? files,
        [Description("receiver")] string? receiver,
        [Description("description")] string? description,
        [Description("category")] string? category,
        [Description("receipt")] string? receipt,
        [Description("datum")] DateTime? datum
    )
    {
        using var db = new ProjektportalContext(_config);
        var dto = new MailboxOutgoingDto {
            Status = status,
            Files = files,
            Receiver = receiver,
            Description = description,
            Category = category,
            Receipt = receipt,
            Datum = datum
        };
        var entity = new MailboxOutgoingMapper().MapMailboxOutgoingDtoToMailboxOutgoing(dto);
        entity.MailboxOutgoingId = Guid.NewGuid().ToString();
        db.MailboxOutgoing.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(entity));
    }

    [McpServerTool(Name = "mailboxOutgoing_update"), Description("Update an existing MailboxOutgoing")]
    public string Update(
        [Description("status")] string? status,
        [Description("files")] string? files,
        [Description("The mailboxOutgoingId of the MailboxOutgoing to update")] string? mailboxOutgoingId,
        [Description("receiver")] string? receiver,
        [Description("description")] string? description,
        [Description("category")] string? category,
        [Description("receipt")] string? receipt,
        [Description("datum")] DateTime? datum
    )
    {
        using var db = new ProjektportalContext(_config);
        var MailboxOutgoingId = db.MailboxOutgoing.FirstOrDefault(m => m.MailboxOutgoingId == mailboxOutgoingId);
        if (MailboxOutgoingId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new MailboxOutgoingDto {
            Status = status,
            Files = files,
            MailboxOutgoingId = mailboxOutgoingId,
            Receiver = receiver,
            Description = description,
            Category = category,
            Receipt = receipt,
            Datum = datum
        };
        MailboxOutgoingId = new MailboxOutgoingMapper().UpdateMapMailboxOutgoingDtoToMailboxOutgoing(MailboxOutgoingId, dto);
        db.MailboxOutgoing.Update(MailboxOutgoingId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxOutgoingMapper().MapMailboxOutgoingToMailboxOutgoingDto(MailboxOutgoingId));
    }

    [McpServerTool(Name = "mailboxOutgoing_delete"), Description("Delete a MailboxOutgoing by ID")]
    public string Delete([Description("The ID of the MailboxOutgoing to delete")] string mailboxOutgoingId)
    {
        using var db = new ProjektportalContext(_config);
        var MailboxOutgoingId = db.MailboxOutgoing.FirstOrDefault(m => m.MailboxOutgoingId == mailboxOutgoingId);
        if (MailboxOutgoingId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.MailboxOutgoing.Remove(MailboxOutgoingId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = mailboxOutgoingId });
    }
}
