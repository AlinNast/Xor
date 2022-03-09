namespace Application.Models
{
    public class RecievedFile
    {
        public string Binary { get; set; }

        public IFormFile FileToEncrypt { get; set; }
    }
    
}
