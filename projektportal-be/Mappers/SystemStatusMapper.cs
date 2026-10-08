using System.Collections.ObjectModel;
using projektportal_be.Models;
using projektportal_be.Models.Dto;

namespace projektportal_be.Mappers;

public class SystemStatusMapper
{
    public SystemStatusDto MapSystemStatusToSystemStatusDto(
        SystemStatus systemStatus
    ) {
        return new SystemStatusDto
        {
            Blocking = systemStatus.Blocking,
            ToDate = systemStatus.ToDate,
            SystemStatusId = systemStatus.SystemStatusId,
            FromDate = systemStatus.FromDate,
            Name = systemStatus.Name,
        };
    }

    public SystemStatus MapSystemStatusDtoToSystemStatus(
        SystemStatusDto systemStatus
    ) {
        return new SystemStatus
        {
            Blocking = systemStatus.Blocking,
            ToDate = systemStatus.ToDate,
            SystemStatusId = systemStatus.SystemStatusId,
            FromDate = systemStatus.FromDate,
            Name = systemStatus.Name,
        };
    }

    public SystemStatus UpdateMapSystemStatusDtoToSystemStatus(
        SystemStatus systemStatus,
        SystemStatusDto updateSystemStatusDto
    ) {
        systemStatus.Blocking = updateSystemStatusDto.Blocking;
        systemStatus.ToDate = updateSystemStatusDto.ToDate;
        systemStatus.SystemStatusId = updateSystemStatusDto.SystemStatusId;
        systemStatus.FromDate = updateSystemStatusDto.FromDate;
        systemStatus.Name = updateSystemStatusDto.Name;

        return systemStatus;
    }
}
