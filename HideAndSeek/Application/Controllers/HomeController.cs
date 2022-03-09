using Microsoft.AspNetCore.Mvc;
using Application.Models;

namespace Application.Controllers
{
   // [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Post([FromForm]RecievedFile x)
        {
            var bin = x;
            return 
            
        }

       
    }

    
}