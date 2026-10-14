using System.Collections.ObjectModel;
using projektportal_be;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace projektportal_be.Controllers;

[ApiController]
[Route(Endpoints.ApiPrefix + "[controller]")]
[Authorize]
public class UsersController : Controller
{
    public IConfiguration Configuration { get; }

    public UsersController(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    [HttpGet("getAll")]
    [AllowAnonymous]
    public IEnumerable<UsersDto> GetAll()
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var userss = db.Users;

            var usersDtos = new Collection<UsersDto>();

            foreach (var users in userss)
            {
                usersDtos.Add(
                    new UsersMapper().MapUsersToUsersDto(users)
                );
            }

            return usersDtos;
        }
    }

    [HttpGet("getUsers/{userId}")]
    [AllowAnonymous]
    public UsersDto GetUsers(string userId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var users = db.Users
                .Where(users => users.UserId == userId);

            return new UsersMapper()
                .MapUsersToUsersDto(users.First());
        }
    }

    [HttpDelete("deleteUsers/{userId}")]
    public ActionResult deleteUsers(string userId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var users = db.Users
                .Where(users => users.UserId == userId);

            if (users.Count() == 0)
            {
                return BadRequest();
            }

            db.Users.Remove(users.First());

            db.SaveChanges();

            return Ok();
        }
    }

    [HttpPut("updateUsers/{userId}")]
    public ActionResult<UsersDto> updateUsers(string userId, [FromBody] UsersDto usersDto)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var usersList = db.Users
                .Where(users => users.UserId == userId);

            if (usersList.Count() == 0)
            {
                return BadRequest();
            }

            var users = usersList.First();

            users = new UsersMapper().UpdateMapUsersDtoToUsers(users, usersDto);

            db.Users.Update(users);

            db.SaveChanges();

            return new UsersMapper().MapUsersToUsersDto(users);
        }
    }

    [HttpPost("createUsers")]
    public ActionResult<UsersDto> createUsers([FromBody] UsersDto? usersDto)
    {
        if (usersDto == null)
        {
            return BadRequest();
        }

        if (!string.IsNullOrWhiteSpace(usersDto.UserId))
        {
            return BadRequest("userId is set internally.");
        }

        using (var db = new ProjektportalContext(Configuration))
        {
            string userId = Guid.NewGuid().ToString();

            var newElement = new UsersMapper().MapUsersDtoToUsers(usersDto);

            newElement.UserId = userId;

            db.Users.Add(newElement);

            db.SaveChanges();

            var saved = db.Users.First(p => p.UserId == userId);
            return Ok(new UsersMapper().MapUsersToUsersDto(saved));
        }
    }
}