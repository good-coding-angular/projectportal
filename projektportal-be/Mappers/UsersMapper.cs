using System.Collections.ObjectModel;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.Mappers;

public class UsersMapper
{
    public UsersDto MapUsersToUsersDto(
        Users users
    ) {
        return new UsersDto
        {
            UserId = users.UserId,
            Name = users.Name,
            Password = users.Password,
            Active = users.Active,
        };
    }

    public Users MapUsersDtoToUsers(
        UsersDto users
    ) {
        return new Users
        {
            UserId = users.UserId,
            Name = users.Name,
            Password = users.Password,
            Active = users.Active,
        };
    }

    public Users UpdateMapUsersDtoToUsers(
        Users users,
        UsersDto updateUsersDto
    ) {
        users.UserId = updateUsersDto.UserId;
        users.Name = updateUsersDto.Name;
        users.Password = updateUsersDto.Password;
        users.Active = updateUsersDto.Active;

        return users;
    }
}
