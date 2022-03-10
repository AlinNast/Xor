using Application;
using Microsoft.Extensions.FileProviders;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      builder =>
                      {
                          builder.WithOrigins("https://localhost:3000")
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot/Files/") );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();
app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();
app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
        System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot/Files")),
    RequestPath = "",
    EnableDefaultFiles = true

}) ; 

app.MapControllers();

app.Run();
