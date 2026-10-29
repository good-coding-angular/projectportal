using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Server;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.McpTools;

[McpServerToolType]
public class ServicesMcpTools
{
    private readonly IConfiguration _config;

    public ServicesMcpTools(IConfiguration config)
    {
        _config = config;
    }

    [McpServerTool(Name = "services_get_all"), Description("Retrieve all Services entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new ServicesMapper();
        var result = db.Services.ToList().Select(m => mapper.MapServicesToServicesDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "services_get"), Description("Retrieve a single Services entry by ID")]
    public string Get([Description("The Services ID")] string serviceId)
    {
        using var db = new ProjektportalContext(_config);
        var ServiceId = db.Services.FirstOrDefault(m => m.ServiceId == serviceId);
        if (ServiceId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new ServicesMapper().MapServicesToServicesDto(ServiceId));
    }

    [McpServerTool(Name = "services_create"), Description("Create a new Services")]
    public string Create(
        [Description("active")] bool? active,
        [Description("name")] string? name,
        [Description("url")] string? url,
        [Description("module")] string? module
    )
    {
        using var db = new ProjektportalContext(_config);
        var dto = new ServicesDto {
            Active = active,
            Name = name,
            Url = url,
            Module = module
        };
        var entity = new ServicesMapper().MapServicesDtoToServices(dto);
        entity.ServiceId = Guid.NewGuid().ToString();
        db.Services.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new ServicesMapper().MapServicesToServicesDto(entity));
    }

    [McpServerTool(Name = "services_update"), Description("Update an existing Services")]
    public string Update(
        [Description("The serviceId of the Services to update")] string? serviceId,
        [Description("active")] bool? active,
        [Description("name")] string? name,
        [Description("url")] string? url,
        [Description("module")] string? module
    )
    {
        using var db = new ProjektportalContext(_config);
        var ServiceId = db.Services.FirstOrDefault(m => m.ServiceId == serviceId);
        if (ServiceId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new ServicesDto {
            ServiceId = serviceId,
            Active = active,
            Name = name,
            Url = url,
            Module = module
        };
        ServiceId = new ServicesMapper().UpdateMapServicesDtoToServices(ServiceId, dto);
        db.Services.Update(ServiceId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new ServicesMapper().MapServicesToServicesDto(ServiceId));
    }

    [McpServerTool(Name = "services_delete"), Description("Delete a Services by ID")]
    public string Delete([Description("The ID of the Services to delete")] string serviceId)
    {
        using var db = new ProjektportalContext(_config);
        var ServiceId = db.Services.FirstOrDefault(m => m.ServiceId == serviceId);
        if (ServiceId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.Services.Remove(ServiceId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = serviceId });
    }
}
