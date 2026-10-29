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

    [McpServerTool(Name = "mailboxLabel_get_all"), Description("Retrieve all MailboxLabel entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new MailboxLabelMapper();
        var result = db.MailboxLabel.ToList().Select(m => mapper.MapMailboxLabelToMailboxLabelDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "mailboxLabel_get"), Description("Retrieve a single MailboxLabel entry by ID")]
    public string Get([Description("The MailboxLabel ID")] string mailboxLabelId)
    {
        using var db = new ProjektportalContext(_config);
        var MailboxLabelId = db.MailboxLabel.FirstOrDefault(m => m.MailboxLabelId == mailboxLabelId);
        if (MailboxLabelId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(MailboxLabelId));
    }

    [McpServerTool(Name = "mailboxLabel_create"), Description("Create a new MailboxLabel")]
    public string Create(
        [Description("name")] string? name
    )
    {
        using var db = new ProjektportalContext(_config);
        var dto = new MailboxLabelDto {
            Name = name
        };
        var entity = new MailboxLabelMapper().MapMailboxLabelDtoToMailboxLabel(dto);
        entity.MailboxLabelId = Guid.NewGuid().ToString();
        db.MailboxLabel.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(entity));
    }

    [McpServerTool(Name = "mailboxLabel_update"), Description("Update an existing MailboxLabel")]
    public string Update(
        [Description("The mailboxLabelId of the MailboxLabel to update")] string? mailboxLabelId,
        [Description("name")] string? name
    )
    {
        using var db = new ProjektportalContext(_config);
        var MailboxLabelId = db.MailboxLabel.FirstOrDefault(m => m.MailboxLabelId == mailboxLabelId);
        if (MailboxLabelId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new MailboxLabelDto {
            MailboxLabelId = mailboxLabelId,
            Name = name
        };
        MailboxLabelId = new MailboxLabelMapper().UpdateMapMailboxLabelDtoToMailboxLabel(MailboxLabelId, dto);
        db.MailboxLabel.Update(MailboxLabelId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new MailboxLabelMapper().MapMailboxLabelToMailboxLabelDto(MailboxLabelId));
    }

    [McpServerTool(Name = "mailboxLabel_delete"), Description("Delete a MailboxLabel by ID")]
    public string Delete([Description("The ID of the MailboxLabel to delete")] string mailboxLabelId)
    {
        using var db = new ProjektportalContext(_config);
        var MailboxLabelId = db.MailboxLabel.FirstOrDefault(m => m.MailboxLabelId == mailboxLabelId);
        if (MailboxLabelId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.MailboxLabel.Remove(MailboxLabelId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = mailboxLabelId });
    }
}
