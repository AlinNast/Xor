using System.Text;

namespace Application
{
    public class Tools
    {
        public static string FileName { get; set; }
        private static string StringToBinary(string key)
        {
            StringBuilder binaryKey = new StringBuilder();

            foreach (char c in key.ToCharArray())
            {
                binaryKey.Append(Convert.ToString(c, 2).PadLeft(8, '0'));
            }
            return binaryKey.ToString();
        }

        public static bool IsKeyValid(string key)
        {
            foreach(char c in key.ToLower())
            {
                if (!"0123456789abcdef".Contains(c)) { return false; }
            }
            return true;
        }

        private static byte[] XORCipher(byte[] data, string binaryKey)
        {
            byte[] xor = new byte[data.Length];
            for (int i = 0; i < data.Length; i++)
            {
                xor[i] = (byte)(data[i] ^ binaryKey[i % data.Length]);
            }
            return xor;
        }

        public static void ProcesFile(IFormFile fileToEncrypt, string key, string operationType)
        {
            using var fileStream = fileToEncrypt.OpenReadStream();
            byte[] bytes = new byte[fileToEncrypt.Length];
            fileStream.Read(bytes, 0, (int)fileToEncrypt.Length);

            string binaryKey = StringToBinary(key);
            string binaryFile = FileToBinary(fileToEncrypt);

            string fileName = fileToEncrypt.FileName;
            string newFileName = ChangeFileName(fileName, operationType);
            FileName = newFileName;

            byte[] encryptedBytes = XORCipher(bytes,binaryKey);
            System.IO.File.WriteAllBytes("./wwwroot/Files/"+newFileName, encryptedBytes); // Requires System.IO

        }

        public static string ChangeFileName(string fileName, string operationType)
        {
            if(operationType == "Encrypt")
            {
                return fileName += ".enc";
            }
            else if (fileName.EndsWith(".enc") && fileName.Substring(0, fileName.Length - 4).Contains("."))
            { 

                return fileName.Substring(0, fileName.Length - 4);
            }


            return fileName += ".dec";
        }

        private static string FileToBinary(IFormFile fileToEncrypt)
        {
            using var fileStream = fileToEncrypt.OpenReadStream();
            byte[] bytes = new byte[fileToEncrypt.Length];

            return StringToBinary(bytes.ToString());
        }

        
    }
}
