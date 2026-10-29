using Microsoft.AspNetCore.Authentication.JwtBearer;

using projektportal_be.McpTools;
var builder = WebApplication.CreateBuilder(args);

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var maxFileSize = 83886080;

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddCors(
        options =>
        {
            options.AddPolicy(
                name: MyAllowSpecificOrigins,
                policy =>
                {
                    Console.WriteLine("Loaded Cors policy");
                    policy.WithOrigins("*");
                    policy.WithMethods("*");
                    policy.WithHeaders("*");
                }
            );
        }
    );
}


builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Lädt die Konfiguration automatisch aus der appsettings.json
        builder.Configuration.Bind("Authentication:Schemes:Bearer", options);

        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddMcpServer()
    .WithHttpTransport()
    .WithTools<MailboxLabelMcpTools>()
    .WithTools<UsersMcpTools>()
    .WithTools<ServicesMcpTools>()
    .WithTools<MailboxOutgoingMcpTools>()
    .WithTools<MailboxMcpTools>()
    .WithTools<SystemStatusMcpTools>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.UseAuthentication();
app.UseAuthorization();


app.MapMcp("/mcp").RequireAuthorization();
app.Run();