using Microsoft.AspNetCore.Mvc;
using Application.Models;
using System.IO;
using Application;

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
        public IActionResult Post([FromForm]RecievedFile recievedFile)
        {
            var key = recievedFile.EncryptionKey;
            if (!Tools.IsKeyValid(key))
            {
                return BadRequest(new { message = "Key is not valid" });
            }

            var fileToEncrypt = recievedFile.FileToEncrypt;
            if (fileToEncrypt.Length == 0)
            {
                return BadRequest(new { message = "your file is empty" });
            }
            if (fileToEncrypt == null)
            {
                return BadRequest(new { message = "no file uploaded" });
            }

            var operationType = recievedFile.OperationType;

            Tools.ProcesFile(fileToEncrypt, key, operationType);

            return Ok();
            
        }

        

       
    }

    
}