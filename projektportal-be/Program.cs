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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();