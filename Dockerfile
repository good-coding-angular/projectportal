FROM mcr.microsoft.com/dotnet/sdk:10.0 AS builder
WORKDIR /app

# set mirrored nuget-source

# Copy csproj and restore as distinct layers
COPY projektportal-be/*.csproj ./

RUN dotnet restore

# Copy everything else and build
COPY projektportal-be ./
#RUN dotnet test
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:10.0 as final-env

RUN apt-get update && apt-get install -y vim apt-utils

RUN mkdir -p /app
WORKDIR /app

COPY --from=builder /app/out .

RUN update-ca-certificates

RUN mkdir -p /app/wwwroot
COPY projektportal-fe/dist/projektportal-fe ./wwwroot

ENTRYPOINT ["dotnet", "projektportal-be.dll"]
