using System.ComponentModel;
using System.Text.Json;
using ModelContextProtocol.Server;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.McpTools;

[McpServerToolType]
public class UsersMcpTools
{
    private readonly IConfiguration _config;

    public UsersMcpTools(IConfiguration config)
    {
        _config = config;
    }

    [McpServerTool(Name = "users_get_all"), Description("Retrieve all Users entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new UsersMapper();
        var result = db.Users.ToList().Select(m => mapper.MapUsersToUsersDto(m));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "users_get"), Description("Retrieve a single Users entry by ID")]
    public string Get([Description("The Users ID")] string userId)
    {
        using var db = new ProjektportalContext(_config);
        var UserId = db.Users.FirstOrDefault(m => m.UserId == userId);
        if (UserId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new UsersMapper().MapUsersToUsersDto(UserId));
    }

    [McpServerTool(Name = "users_create"), Description("Create a new Users")]
    public string Create(
        [Description("name")] string? name,
        [Description("password")] string? password,
        [Description("active")] int? active
    )
    {
        using var db = new ProjektportalContext(_config);
        var dto = new UsersDto {
            Name = name,
            Password = password,
            Active = active
        };
        var entity = new UsersMapper().MapUsersDtoToUsers(dto);
        entity.UserId = Guid.NewGuid().ToString();
        db.Users.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new UsersMapper().MapUsersToUsersDto(entity));
    }

    [McpServerTool(Name = "users_update"), Description("Update an existing Users")]
    public string Update(
        [Description("The userId of the Users to update")] string? userId,
        [Description("name")] string? name,
        [Description("password")] string? password,
        [Description("active")] int? active
    )
    {
        using var db = new ProjektportalContext(_config);
        var UserId = db.Users.FirstOrDefault(m => m.UserId == userId);
        if (UserId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new UsersDto {
            UserId = userId,
            Name = name,
            Password = password,
            Active = active
        };
        UserId = new UsersMapper().UpdateMapUsersDtoToUsers(UserId, dto);
        db.Users.Update(UserId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new UsersMapper().MapUsersToUsersDto(UserId));
    }

    [McpServerTool(Name = "users_delete"), Description("Delete a Users by ID")]
    public string Delete([Description("The ID of the Users to delete")] string userId)
    {
        using var db = new ProjektportalContext(_config);
        var UserId = db.Users.FirstOrDefault(m => m.UserId == userId);
        if (UserId == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.Users.Remove(UserId);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = userId });
    }
}
