using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Server;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.McpTools;

[McpServerToolType]
public class MailboxLabelMcpTools
{
    private readonly IConfiguration _config;

    public MailboxLabelMcpTools(IConfiguration config)
    {
        _config = config;
    }

    [McpServerTool(Name = "mailbox_label_get_all"), Description("Retrieve all mailbox label entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new MailboxLabelMapper();
        var result = db.MailboxLabel.ToList().Select(m => mapper.MapMailboxLabelToMailboxLabelDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "mailbox_label_get"), Description("Retrieve a single mailbox label by ID")]
    public string Get([Description("The mailbox label ID")] string mailboxLabelId)
    {
        using var db = new ProjektportalContext(_config);
        var label = db.MailboxLabel.FirstOrDefault(m => m.MailboxLabelId == mailboxLabelId);
        if (label == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(label));
    }

    [McpServerTool(Name = "mailbox_label_create"), Description("Create a new mailbox label")]
    public string Create(
        [Description("Display name of the label")] string? name)
    {
        using var db = new ProjektportalContext(_config);
        var dto = new MailboxLabelDto { Name = name };
        var entity = new MailboxLabelMapper().MapMailboxLabelDtoToMailboxLabel(dto);
        entity.MailboxLabelId = Guid.NewGuid().ToString();
        db.MailboxLabel.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(entity));
    }

    [McpServerTool(Name = "mailbox_label_update"), Description("Update an existing mailbox label")]
    public string Update(
        [Description("The ID of the mailbox label to update")] string mailboxLabelId,
        [Description("New display name for the label")] string? name)
    {
        using var db = new ProjektportalContext(_config);
        var label = db.MailboxLabel.FirstOrDefault(m => m.MailboxLabelId == mailboxLabelId);
        if (label == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new MailboxLabelDto { MailboxLabelId = mailboxLabelId, Name = name };
        label = new MailboxLabelMapper().UpdateMapMailboxLabelDtoToMailboxLabel(label, dto);
        db.MailboxLabel.Update(label);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(label));
    }

    [McpServerTool(Name = "mailbox_label_delete"), Description("Delete a mailbox label by ID")]
    public string Delete([Description("The ID of the mailbox label to delete")] string mailboxLabelId)
    {
        using var db = new ProjektportalContext(_config);
        var label = db.MailboxLabel.FirstOrDefault(m => m.MailboxLabelId == mailboxLabelId);
        if (label == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.MailboxLabel.Remove(label);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = mailboxLabelId });
    }
}
