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

        private readonly string _filePath;

        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger, string filePath)
        {
            _logger = logger;
            _filePath = filePath;
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

            var isCRC = recievedFile.isCRCChecked;

            Tools.ProcesFile(fileToEncrypt, key, operationType);

            return Ok();
            
        }

        [HttpGet]
        public FileContentResult DownloadFile()
        {
            return File(System.IO.File.ReadAllBytes($"{_filePath}/{Tools.FileName}"), "application/octet-stream", Tools.FileName);
            
        }


        

       
    }

    
}