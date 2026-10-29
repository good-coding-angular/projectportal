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

    [McpServerTool(Name = "users_get_all"), Description("Retrieve all user entries")]
    public string GetAll()
    {
        using var db = new ProjektportalContext(_config);
        var mapper = new UsersMapper();
        var result = db.Users.ToList().Select(u => mapper.MapUsersToUsersDto(u));
        return JsonSerializer.Serialize(result);
    }

    [McpServerTool(Name = "users_get"), Description("Retrieve a single user entry by ID")]
    public string Get([Description("The user ID")] string userId)
    {
        using var db = new ProjektportalContext(_config);
        var user = db.Users.FirstOrDefault(u => u.UserId == userId);
        if (user == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        return JsonSerializer.Serialize(new UsersMapper().MapUsersToUsersDto(user));
    }

    [McpServerTool(Name = "users_create"), Description("Create a new user entry")]
    public string Create(
        [Description("Display name of the user")] string name,
        [Description("Password hash")] string password,
        [Description("Whether the user is active (1 = active, 0 = inactive)")] int? active)
    {
        using var db = new ProjektportalContext(_config);
        var dto = new UsersDto
        {
            Name = name,
            Password = password,
            Active = active,
        };
        var entity = new UsersMapper().MapUsersDtoToUsers(dto);
        entity.UserId = Guid.NewGuid().ToString();
        db.Users.Add(entity);
        db.SaveChanges();
        return JsonSerializer.Serialize(new UsersMapper().MapUsersToUsersDto(entity));
    }

    [McpServerTool(Name = "users_update"), Description("Update an existing user entry")]
    public string Update(
        [Description("The ID of the user to update")] string userId,
        [Description("Display name")] string name,
        [Description("Password hash")] string password,
        [Description("Whether the user is active (1 = active, 0 = inactive)")] int? active)
    {
        using var db = new ProjektportalContext(_config);
        var user = db.Users.FirstOrDefault(u => u.UserId == userId);
        if (user == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        var dto = new UsersDto
        {
            UserId = userId,
            Name = name,
            Password = password,
            Active = active,
        };
        user = new UsersMapper().UpdateMapUsersDtoToUsers(user, dto);
        db.Users.Update(user);
        db.SaveChanges();
        return JsonSerializer.Serialize(new UsersMapper().MapUsersToUsersDto(user));
    }

    [McpServerTool(Name = "users_delete"), Description("Delete a user entry by ID")]
    public string Delete([Description("The ID of the user to delete")] string userId)
    {
        using var db = new ProjektportalContext(_config);
        var user = db.Users.FirstOrDefault(u => u.UserId == userId);
        if (user == null)
            return JsonSerializer.Serialize(new { error = "Not found" });
        db.Users.Remove(user);
        db.SaveChanges();
        return JsonSerializer.Serialize(new { success = true, deletedId = userId });
    }
}
