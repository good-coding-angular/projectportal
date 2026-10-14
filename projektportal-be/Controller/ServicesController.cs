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
public class ServicesController : Controller
{
    public IConfiguration Configuration { get; }

    public ServicesController(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    [HttpGet("getAll")]
    [AllowAnonymous]
    public IEnumerable<ServicesDto> GetAll()
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var servicess = db.Services;

            var servicesDtos = new Collection<ServicesDto>();

            foreach (var services in servicess)
            {
                servicesDtos.Add(
                    new ServicesMapper().MapServicesToServicesDto(services)
                );
            }

            return servicesDtos;
        }
    }

    [HttpGet("getServices/{serviceId}")]
    [AllowAnonymous]
    public ServicesDto GetServices(string serviceId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var services = db.Services
                .Where(services => services.ServiceId == serviceId);

            return new ServicesMapper()
                .MapServicesToServicesDto(services.First());
        }
    }

    [HttpDelete("deleteServices/{serviceId}")]
    public ActionResult deleteServices(string serviceId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var services = db.Services
                .Where(services => services.ServiceId == serviceId);

            if (services.Count() == 0)
            {
                return BadRequest();
            }

            db.Services.Remove(services.First());

            db.SaveChanges();

            return Ok();
        }
    }

    [HttpPut("updateServices/{serviceId}")]
    public ActionResult<ServicesDto> updateServices(string serviceId, [FromBody] ServicesDto servicesDto)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var servicesList = db.Services
                .Where(services => services.ServiceId == serviceId);

            if (servicesList.Count() == 0)
            {
                return BadRequest();
            }

            var services = servicesList.First();

            services = new ServicesMapper().UpdateMapServicesDtoToServices(services, servicesDto);

            db.Services.Update(services);

            db.SaveChanges();

            return new ServicesMapper().MapServicesToServicesDto(services);
        }
    }

    [HttpPost("createServices")]
    public ActionResult<ServicesDto> createServices([FromBody] ServicesDto? servicesDto)
    {
        if (servicesDto == null)
        {
            return BadRequest();
        }

        if (!string.IsNullOrWhiteSpace(servicesDto.ServiceId))
        {
            return BadRequest("serviceId is set internally.");
        }

        using (var db = new ProjektportalContext(Configuration))
        {
            string serviceId = Guid.NewGuid().ToString();

            var newElement = new ServicesMapper().MapServicesDtoToServices(servicesDto);

            newElement.ServiceId = serviceId;

            db.Services.Add(newElement);

            db.SaveChanges();

            var saved = db.Services.First(p => p.ServiceId == serviceId);
            return Ok(new ServicesMapper().MapServicesToServicesDto(saved));
        }
    }
}