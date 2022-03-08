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

        [HttpGet(Name = "/")]
        public void Get()
        {
            Console.WriteLine("get works");
        }

        [HttpPost(Name = "/upload")]
        public void Post(string binary)
        {
            Console.WriteLine("entered post");
            var file = binary;
            Console.WriteLine("sofar");
        }
    }
}