using System.Collections.ObjectModel;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.Mappers;

public class ServicesMapper
{
    public ServicesDto MapServicesToServicesDto(
        Services services
    ) {
        return new ServicesDto
        {
            ServiceId = services.ServiceId,
            Active = services.Active,
            Name = services.Name,
            Url = services.Url,
            Module = services.Module,
        };
    }

    public Services MapServicesDtoToServices(
        ServicesDto services
    ) {
        return new Services
        {
            ServiceId = services.ServiceId,
            Active = services.Active,
            Name = services.Name,
            Url = services.Url,
            Module = services.Module,
        };
    }

    public Services UpdateMapServicesDtoToServices(
        Services services,
        ServicesDto updateServicesDto
    ) {
        services.ServiceId = updateServicesDto.ServiceId;
        services.Active = updateServicesDto.Active;
        services.Name = updateServicesDto.Name;
        services.Url = updateServicesDto.Url;
        services.Module = updateServicesDto.Module;

        return services;
    }
}
