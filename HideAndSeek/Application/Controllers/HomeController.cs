using Microsoft.AspNetCore.Mvc;

namespace Application.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public void Post(/*[FromBody]string? binary*/)
        {
            Console.WriteLine("entered post");
            Console.WriteLine("sofar");
        }

       
    }
}