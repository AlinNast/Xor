namespace Application.Models
{
    public class RecievedFile
    {
        public string EncryptionKey { get; set; }

        public IFormFile FileToEncrypt { get; set; }
    }
    
}
