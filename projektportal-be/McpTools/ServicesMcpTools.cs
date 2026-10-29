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

    [McpServerTool(Name = "services_get_all"), Description("Retrieve all service entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new ServicesMapper();
        var result = db.Services.ToList().Select(s => mapper.MapServicesToServicesDto(s));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "services_get"), Description("Retrieve a single service entry by ID")]
    public string Get([Description("The service ID")] string serviceId)
    {
        using var db = new ProjektportalContext(_config);
        var service = db.Services.FirstOrDefault(s => s.ServiceId == serviceId);
        if (service == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new ServicesMapper().MapServicesToServicesDto(service));
    }

    [McpServerTool(Name = "services_create"), Description("Create a new service entry")]
    public string Create(
        [Description("Display name of the service")] string name,
        [Description("Whether the service is active")] bool? active,
        [Description("URL of the service")] string? url,
        [Description("Module name")] string? module)
    {
        using var db = new ProjektportalContext(_config);
        var dto = new ServicesDto
        {
            Name = name,
            Active = active,
            Url = url,
            Module = module,
        };
        var entity = new ServicesMapper().MapServicesDtoToServices(dto);
        entity.ServiceId = Guid.NewGuid().ToString();
        db.Services.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new ServicesMapper().MapServicesToServicesDto(entity));
    }

    [McpServerTool(Name = "services_update"), Description("Update an existing service entry")]
    public string Update(
        [Description("The ID of the service to update")] string serviceId,
        [Description("Display name")] string name,
        [Description("Whether the service is active")] bool? active,
        [Description("URL")] string? url,
        [Description("Module name")] string? module)
    {
        using var db = new ProjektportalContext(_config);
        var service = db.Services.FirstOrDefault(s => s.ServiceId == serviceId);
        if (service == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new ServicesDto
        {
            ServiceId = serviceId,
            Name = name,
            Active = active,
            Url = url,
            Module = module,
        };
        service = new ServicesMapper().UpdateMapServicesDtoToServices(service, dto);
        db.Services.Update(service);
        db.SaveChanges();
        return JsonSerializer.Serialize(new ServicesMapper().MapServicesToServicesDto(service));
    }

    [McpServerTool(Name = "services_delete"), Description("Delete a service entry by ID")]
    public string Delete([Description("The ID of the service to delete")] string serviceId)
    {
        using var db = new ProjektportalContext(_config);
        var service = db.Services.FirstOrDefault(s => s.ServiceId == serviceId);
        if (service == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.Services.Remove(service);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = serviceId });
    }
}
