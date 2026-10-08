using System.Collections.ObjectModel;
using projektportal_be;
using projektportal_be.Mappers;
using projektportal_be.Models;
using projektportal_be.Models.Dto;
using Microsoft.AspNetCore.Mvc;

namespace projektportal_be.Controllers;

[ApiController]
[Route(Endpoints.ApiPrefix + "[controller]")]
public class SystemStatusController : Controller
{
    public IConfiguration Configuration { get; }

    public SystemStatusController(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    [HttpGet("getAll")]
    public IEnumerable<SystemStatusDto> GetAll()
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var systemStatuss = db.SystemStatus;

            var systemStatusDtos = new Collection<SystemStatusDto>();

            foreach (var systemStatus in systemStatuss)
            {
                systemStatusDtos.Add(
                    new SystemStatusMapper().MapSystemStatusToSystemStatusDto(systemStatus)
                );
            }

            return systemStatusDtos;
        }
    }

    [HttpGet("getSystemStatus/{systemStatusId}")]
    public SystemStatusDto GetSystemStatus(string systemStatusId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var systemStatus = db.SystemStatus
                .Where(systemStatus => systemStatus.SystemStatusId == systemStatusId);

            return new SystemStatusMapper()
                .MapSystemStatusToSystemStatusDto(systemStatus.First());
        }
    }

    [HttpDelete("deleteSystemStatus/{systemStatusId}")]
    public ActionResult deleteSystemStatus(string systemStatusId)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var systemStatus = db.SystemStatus
                .Where(systemStatus => systemStatus.SystemStatusId == systemStatusId);

            if (systemStatus.Count() == 0)
            {
                return BadRequest();
            }

            db.SystemStatus.Remove(systemStatus.First());

            db.SaveChanges();

            return Ok();
        }
    }

    [HttpPut("updateSystemStatus/{systemStatusId}")]
    public ActionResult<SystemStatusDto> updateSystemStatus(string systemStatusId, [FromBody] SystemStatusDto systemStatusDto)
    {
        using (var db = new ProjektportalContext(Configuration))
        {
            var systemStatusList = db.SystemStatus
                .Where(systemStatus => systemStatus.SystemStatusId == systemStatusId);

            if (systemStatusList.Count() == 0)
            {
                return BadRequest();
            }

            var systemStatus = systemStatusList.First();

            systemStatus = new SystemStatusMapper().UpdateMapSystemStatusDtoToSystemStatus(systemStatus, systemStatusDto);

            db.SystemStatus.Update(systemStatus);

            db.SaveChanges();

            return new SystemStatusMapper().MapSystemStatusToSystemStatusDto(systemStatus);
        }
    }

    [HttpPost("createSystemStatus")]
    public ActionResult<SystemStatusDto> createSystemStatus([FromBody] SystemStatusDto? systemStatusDto)
    {
        if (systemStatusDto == null)
        {
            return BadRequest();
        }

        if (!string.IsNullOrWhiteSpace(systemStatusDto.SystemStatusId))
        {
            return BadRequest("systemStatusId is set internally.");
        }

        using (var db = new ProjektportalContext(Configuration))
        {
            string systemStatusId = Guid.NewGuid().ToString();

            var newElement = new SystemStatusMapper().MapSystemStatusDtoToSystemStatus(systemStatusDto);

            newElement.SystemStatusId = systemStatusId;

            db.SystemStatus.Add(newElement);

            db.SaveChanges();

            var saved = db.SystemStatus.First(p => p.SystemStatusId == systemStatusId);
            return Ok(new SystemStatusMapper().MapSystemStatusToSystemStatusDto(saved));
        }
    }
}