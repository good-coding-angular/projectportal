using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Server;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.McpTools;

[McpServerToolType]
public class SystemStatusMcpTools
{
    private readonly IConfiguration _config;

    public SystemStatusMcpTools(IConfiguration config)
    {
        _config = config;
    }

    [McpServerTool(Name = "systemStatus_get_all"), Description("Retrieve all SystemStatus entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new SystemStatusMapper();
        var result = db.SystemStatus.ToList().Select(m => mapper.MapSystemStatusToSystemStatusDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "systemStatus_get"), Description("Retrieve a single SystemStatus entry by ID")]
    public string Get([Description("The SystemStatus ID")] string systemStatusId)
    {
        using var db = new ProjektportalContext(_config);
        var SystemStatusId = db.SystemStatus.FirstOrDefault(m => m.SystemStatusId == systemStatusId);
        if (SystemStatusId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new SystemStatusMapper().MapSystemStatusToSystemStatusDto(SystemStatusId));
    }

    [McpServerTool(Name = "systemStatus_create"), Description("Create a new SystemStatus")]
    public string Create(
        [Description("blocking")] bool? blocking,
        [Description("toDate")] DateTime? toDate,
        [Description("fromDate")] DateTime? fromDate,
        [Description("name")] string? name
    )
    {
        using var db = new ProjektportalContext(_config);
        var dto = new SystemStatusDto {
            Blocking = blocking,
            ToDate = toDate,
            FromDate = fromDate,
            Name = name
        };
        var entity = new SystemStatusMapper().MapSystemStatusDtoToSystemStatus(dto);
        entity.SystemStatusId = Guid.NewGuid().ToString();
        db.SystemStatus.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new SystemStatusMapper().MapSystemStatusToSystemStatusDto(entity));
    }

    [McpServerTool(Name = "systemStatus_update"), Description("Update an existing SystemStatus")]
    public string Update(
        [Description("blocking")] bool? blocking,
        [Description("toDate")] DateTime? toDate,
        [Description("The systemStatusId of the SystemStatus to update")] string? systemStatusId,
        [Description("fromDate")] DateTime? fromDate,
        [Description("name")] string? name
    )
    {
        using var db = new ProjektportalContext(_config);
        var SystemStatusId = db.SystemStatus.FirstOrDefault(m => m.SystemStatusId == systemStatusId);
        if (SystemStatusId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new SystemStatusDto {
            Blocking = blocking,
            ToDate = toDate,
            SystemStatusId = systemStatusId,
            FromDate = fromDate,
            Name = name
        };
        SystemStatusId = new SystemStatusMapper().UpdateMapSystemStatusDtoToSystemStatus(SystemStatusId, dto);
        db.SystemStatus.Update(SystemStatusId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new SystemStatusMapper().MapSystemStatusToSystemStatusDto(SystemStatusId));
    }

    [McpServerTool(Name = "systemStatus_delete"), Description("Delete a SystemStatus by ID")]
    public string Delete([Description("The ID of the SystemStatus to delete")] string systemStatusId)
    {
        using var db = new ProjektportalContext(_config);
        var SystemStatusId = db.SystemStatus.FirstOrDefault(m => m.SystemStatusId == systemStatusId);
        if (SystemStatusId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.SystemStatus.Remove(SystemStatusId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = systemStatusId });
    }
}
