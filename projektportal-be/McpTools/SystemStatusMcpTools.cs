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

    [McpServerTool(Name = "system_status_get_all"), Description("Retrieve all system status entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new SystemStatusMapper();
        var result = db.SystemStatus.ToList().Select(s => mapper.MapSystemStatusToSystemStatusDto(s));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "system_status_get"), Description("Retrieve a single system status entry by ID")]
    public string Get([Description("The system status ID")] string systemStatusId)
    {
        using var db = new ProjektportalContext(_config);
        var status = db.SystemStatus.FirstOrDefault(s => s.SystemStatusId == systemStatusId);
        if (status == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new SystemStatusMapper().MapSystemStatusToSystemStatusDto(status));
    }

    [McpServerTool(Name = "system_status_create"), Description("Create a new system status entry")]
    public string Create(
        [Description("Whether this status is blocking")] bool? blocking,
        [Description("Display name of the status")] string? name,
        [Description("Start date in ISO 8601 format (e.g. 2025-01-15T10:00:00)")] string? fromDate,
        [Description("End date in ISO 8601 format")] string? toDate)
    {
        using var db = new ProjektportalContext(_config);
        var dto = new SystemStatusDto
        {
            Blocking = blocking,
            Name = name,
            FromDate = fromDate != null ? DateTime.Parse(fromDate) : null,
            ToDate = toDate != null ? DateTime.Parse(toDate) : null,
        };
        var entity = new SystemStatusMapper().MapSystemStatusDtoToSystemStatus(dto);
        entity.SystemStatusId = Guid.NewGuid().ToString();
        db.SystemStatus.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new SystemStatusMapper().MapSystemStatusToSystemStatusDto(entity));
    }

    [McpServerTool(Name = "system_status_update"), Description("Update an existing system status entry")]
    public string Update(
        [Description("The ID of the system status to update")] string systemStatusId,
        [Description("Whether this status is blocking")] bool? blocking,
        [Description("Display name")] string? name,
        [Description("Start date in ISO 8601 format")] string? fromDate,
        [Description("End date in ISO 8601 format")] string? toDate)
    {
        using var db = new ProjektportalContext(_config);
        var status = db.SystemStatus.FirstOrDefault(s => s.SystemStatusId == systemStatusId);
        if (status == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new SystemStatusDto
        {
            SystemStatusId = systemStatusId,
            Blocking = blocking,
            Name = name,
            FromDate = fromDate != null ? DateTime.Parse(fromDate) : null,
            ToDate = toDate != null ? DateTime.Parse(toDate) : null,
        };
        status = new SystemStatusMapper().UpdateMapSystemStatusDtoToSystemStatus(status, dto);
        db.SystemStatus.Update(status);
        db.SaveChanges();
        return JsonSerializer.Serialize(new SystemStatusMapper().MapSystemStatusToSystemStatusDto(status));
    }

    [McpServerTool(Name = "system_status_delete"), Description("Delete a system status entry by ID")]
    public string Delete([Description("The ID of the system status to delete")] string systemStatusId)
    {
        using var db = new ProjektportalContext(_config);
        var status = db.SystemStatus.FirstOrDefault(s => s.SystemStatusId == systemStatusId);
        if (status == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.SystemStatus.Remove(status);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = systemStatusId });
    }
}
